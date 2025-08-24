以下是一个**综合性 Kubernetes 资源 YAML 配置文件示例**，包含常见的核心资源：`Deployment`、`Service`、`ConfigMap`、`Secret`、`PersistentVolumeClaim`、`Ingress` 和 `HorizontalPodAutoscaler`，并配有**详细的中文注释说明**，适合用于部署一个典型的 Web 应用（如基于 Nginx + PHP 的应用）。

---

```yaml
# 综合性 Kubernetes 配置文件示例
# 包含：Deployment、Service、ConfigMap、Secret、PVC、Ingress、HPA
# 用途：部署一个带配置、密钥、持久化存储、自动伸缩和外部访问的 Web 应用

---
# 1. ConfigMap：用于存储非敏感配置信息
apiVersion: v1
kind: ConfigMap
metadata:
  name: webapp-config                    # ConfigMap 的名称
  namespace: default                     # 所属命名空间
  labels:
    app: webapp                          # 标签，便于筛选和管理
data:
  nginx.conf: |                          # 配置文件内容，这里是 Nginx 配置
    server {
        listen 80;
        server_name localhost;
        root /var/www/html;
        index index.php index.html;
        location ~ \.php$ {
            fastcgi_pass php-fpm:9000;
            fastcgi_index index.php;
            fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
            include fastcgi_params;
        }
    }
  environment: production                # 环境变量配置

---
# 2. Secret：用于存储敏感信息（如数据库密码）
apiVersion: v1
kind: Secret
metadata:
  name: db-secret                        # Secret 名称
  namespace: default
type: Opaque                           # 普通密钥类型
data:
  # 注意：Secret 中的数据必须是 Base64 编码
  # 可通过命令 echo -n "password123" | base64 生成
  db-password: cGFzc3dvcmQxMjM=       # Base64 编码的数据库密码
  db-username: YWRtaW4=                 # Base64 编码的用户名

---
# 3. PersistentVolumeClaim (PVC)：申请持久化存储
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: webapp-pvc                       # PVC 名称
  namespace: default
spec:
  accessModes:
    - ReadWriteOnce                      # 访问模式：单节点读写
  resources:
    requests:
      storage: 1Gi                       # 请求 1GB 存储空间
  storageClassName: standard             # 存储类名称（根据集群配置填写，如 AWS gp2、GCE pd-standard）

---
# 4. Deployment：部署应用 Pod 并管理副本
apiVersion: apps/v1
kind: Deployment
metadata:
  name: webapp-deployment                # Deployment 名称
  namespace: default
  labels:
    app: webapp
    tier: frontend
spec:
  replicas: 3                            # 期望运行 3 个 Pod 副本
  selector:
    matchLabels:
      app: webapp
  template:                              # Pod 模板
    metadata:
      labels:
        app: webapp
        tier: frontend
    spec:
      containers:
        - name: nginx-container          # 容器名称
          image: nginx:1.21              # 使用的镜像
          ports:
            - containerPort: 80          # 容器暴露端口
          volumeMounts:
            - name: config-volume        # 挂载 ConfigMap
              mountPath: /etc/nginx/conf.d/default.conf
              subPath: nginx.conf
            - name: web-content          # 挂载持久化存储
              mountPath: /var/www/html
          env:
            - name: ENVIRONMENT          # 从 ConfigMap 注入环境变量
              valueFrom:
                configMapKeyRef:
                  name: webapp-config
                  key: environment
            - name: DB_PASSWORD          # 从 Secret 注入敏感信息
              valueFrom:
                secretKeyRef:
                  name: db-secret
                  key: db-password

        - name: php-fpm-container        # 第二个容器：PHP-FPM
          image: php:8.1-fpm
          ports:
            - containerPort: 9000
          volumeMounts:
            - name: web-content
              mountPath: /var/www/html

      volumes:
        - name: config-volume            # 定义挂载卷：来自 ConfigMap
          configMap:
            name: webapp-config
            items:
              - key: nginx.conf
                path: nginx.conf
        - name: web-content              # 挂载 PVC 到容器
          persistentVolumeClaim:
            claimName: webapp-pvc

---
# 5. Service：为 Pod 提供稳定网络访问
apiVersion: v1
kind: Service
metadata:
  name: webapp-service                   # Service 名称
  namespace: default
spec:
  selector:
    app: webapp                          # 将流量转发给标签为 app=webapp 的 Pod
  ports:
    - protocol: TCP
      port: 80                         # Service 暴露的端口
      targetPort: 80                   # 转发到 Pod 的 80 端口
  type: ClusterIP                      # 集群内部访问，也可用 NodePort 或 LoadBalancer

---
# 6. Ingress：对外暴露 HTTP 服务
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: webapp-ingress
  namespace: default
  annotations:
    nginx.ingress.kubernetes.io/rewrite-target: /$1  # URL 重写规则（如果使用 Nginx Ingress Controller）
spec:
  ingressClassName: nginx               # 指定使用的 Ingress Controller 类型
  rules:
    - host: webapp.example.com          # 访问域名
      http:
        paths:
          - path: /(.*)                 # 路径匹配正则
            pathType: ImplementationSpecific
            backend:
              service:
                name: webapp-service    # 转发到上面定义的 Service
                port:
                  number: 80
  # 可选：配置 TLS 证书
  # tls:
  #   - hosts:
  #       - webapp.example.com
  #     secretName: tls-secret          # 一个包含证书的 Secret

---
# 7. HorizontalPodAutoscaler (HPA)：自动伸缩 Pod 副本数
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: webapp-hpa
  namespace: default
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: webapp-deployment             # 要伸缩的目标 Deployment
  minReplicas: 2                        # 最小副本数
  maxReplicas: 10                       # 最大副本数
  metrics:
    - type: Resource
      resource:
        name: cpu
        target:
          type: Utilization
          averageUtilization: 50        # 当 CPU 使用率超过 50% 时自动扩容
    - type: Resource
      resource:
        name: memory
        target:
          type: AverageValue
          averageValue: 200Mi           # 内存使用超过 200Mi 时扩容

```

---

## ✅ 使用说明

### 1. **如何应用该配置？**
```bash
kubectl apply -f webapp-all-in-one.yaml
```

### 2. **前提条件**
- 集群已安装 Ingress Controller（如 Nginx Ingress）
- 存储类 `storageClassName` 需根据实际环境调整（可使用 `kubectl get sc` 查看）
- Secret 中的 Base64 数据需提前编码生成

### 3. **验证部署**
```bash
kubectl get pods,svc,ingress,hpa,pvc -l app=webapp
```

---

## 📌 总结：本配置涵盖的核心知识点

| 资源 | 作用 |
|------|------|
| `ConfigMap` | 管理配置文件和环境变量 |
| `Secret` | 安全存储密码、密钥 |
| `PVC` | 申请持久化存储，防止数据丢失 |
| `Deployment` | 声明式部署应用，支持滚动更新 |
| `Service` | 提供稳定的内部服务访问 |
| `Ingress` | 统一对外暴露 HTTP/HTTPS 服务 |
| `HPA` | 根据 CPU/内存自动伸缩副本数 |

---

这个 YAML 文件是一个**生产级应用部署的典型模板**，适用于学习、测试或作为项目脚手架。你可以根据实际需求（如数据库、微服务架构）进一步扩展。