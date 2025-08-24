要全面掌握 **Kubernetes（K8s）**，需要系统性地学习多个层面的知识，从基础概念到高级运维、安全和生态工具。以下是学习 Kubernetes 所需掌握的核心知识点，按学习路径分类整理：

---

## 一、基础概念与核心对象（必须掌握）

### 1. **Pod**
- 最小调度单位
- 包含一个或多个容器（共享网络、存储）
- 临时性（不可修复，失败后重建）

### 2. **Deployment**
- 管理无状态应用的控制器
- 支持滚动更新、版本回滚、副本数控制
- 基于 ReplicaSet 实现

### 3. **Service**
- 为 Pod 提供稳定的网络访问入口
- 类型：ClusterIP（内部）、NodePort（节点暴露）、LoadBalancer（云厂商）、ExternalName
- 实现服务发现和负载均衡

### 4. **ConfigMap 与 Secret**
- ConfigMap：管理非敏感配置（如环境变量、配置文件）
- Secret：管理敏感数据（密码、token、证书），Base64 编码存储

### 5. **Namespace**
- 资源逻辑隔离（多租户、多环境）
- 常用于 dev/staging/prod 环境划分

### 6. **Label 与 Selector**
- 标签机制，用于资源分类和选择
- 是 Service、Deployment 等对象关联 Pod 的基础

---

## 二、进阶资源对象（中高级必备）

### 7. **StatefulSet**
- 用于有状态应用（如 MySQL、Redis、ZooKeeper）
- 特点：稳定网络标识、持久化存储、有序部署/删除

### 8. **DaemonSet**
- 确保每个节点运行一个 Pod（如日志收集、监控 agent）

### 9. **Job 与 CronJob**
- Job：运行一次性任务（如数据迁移）
- CronJob：定时任务（类似 Linux crontab）

### 10. **Ingress**
- 对外暴露 HTTP/HTTPS 服务
- 配合 Ingress Controller（如 Nginx、Traefik）实现路由规则、TLS 终止

---

## 三、集群架构与组件原理

### 11. **控制平面（Control Plane）组件**
- API Server：集群的“前端”，所有操作入口
- etcd：分布式键值存储，保存集群状态
- Scheduler：调度 Pod 到合适的节点
- Controller Manager：运行各种控制器（Node、Deployment、ReplicaSet 等）

### 12. **工作节点（Worker Node）组件**
- Kubelet：管理节点上的 Pod，与 API Server 通信
- Kube-proxy：实现 Service 的网络代理（iptables/ipvs 模式）
- Container Runtime：Docker、containerd、CRI-O 等

### 13. **CNI（Container Network Interface）**
- 容器网络插件标准
- 常见实现：Calico（推荐）、Flannel、Cilium、Weave
- 负责 Pod 间通信、网络策略

### 14. **CSI（Container Storage Interface）**
- 容器存储插件标准
- 实现持久化存储的动态供给（如 AWS EBS、NFS）

---

## 四、网络与存储管理

### 15. **网络模型**
- 每个 Pod 有独立 IP
- 所有 Pod 可跨节点通信
- Service ClusterIP 虚拟 IP + kube-proxy 实现负载均衡

### 16. **网络策略（NetworkPolicy）**
- 控制 Pod 间访问权限（类似防火墙）
- 基于标签选择器定义规则

### 17. **存储卷（Volumes）**
- emptyDir：临时存储（Pod 删除即清空）
- hostPath：挂载宿主机目录（仅限单机测试）
- persistentVolume（PV）与 persistentVolumeClaim（PVC）
    - PV：集群管理员提供的存储资源
    - PVC：用户申请存储的“请求”

---

## 五、配置管理与声明式部署

### 18. **YAML 文件编写**
- 掌握 K8s 资源的 YAML 定义格式
- 包括 apiVersion、kind、metadata、spec、status

### 19. **Helm**
- K8s 的“包管理器”
- 使用 Chart 管理复杂应用模板（如 MySQL、Prometheus）
- 支持版本管理、参数化部署

### 20. **Kustomize**
- 无需模板的配置管理工具
- 通过 base + overlay 实现环境差异化配置

---

## 六、安全与权限管理

### 21. **RBAC（基于角色的访问控制）**
- 用户、服务账户（ServiceAccount）
- 角色（Role/ClusterRole）与绑定（RoleBinding/ClusterRoleBinding）
- 控制谁可以访问哪些资源

### 22. **Pod Security Policies / Pod Security Admission**
- 限制 Pod 的权限（如是否允许特权模式、挂载 hostPath）

### 23. **TLS 与证书管理**
- 理解 kube-apiserver、etcd、kubelet 之间的证书通信
- 使用 kubeadm 或 cert-manager 管理证书

---

## 七、监控、日志与故障排查

### 24. **日志管理**
- `kubectl logs` 查看 Pod 日志
- 集中式日志收集：Fluentd + Elasticsearch + Kibana（EFK）

### 25. **监控与告警**
- Metrics Server：提供资源指标（CPU、内存）
- Prometheus + Grafana：主流监控方案
- 使用 `kubectl top` 查看资源使用

### 26. **故障排查命令**
- `kubectl get nodes/pods/services/deployments`
- `kubectl describe pod <name>`：查看事件和状态
- `kubectl exec -it <pod> -- sh`：进入容器调试
- `kubectl logs <pod>`：查看日志
- `kubectl port-forward`：本地端口转发调试

---

## 八、集群部署与运维

### 27. **集群搭建方式**
- Minikube / Kind：本地学习测试
- kubeadm：生产环境快速搭建
- 云厂商托管服务：EKS（AWS）、GKE（GCP）、AKS（Azure）

### 28. **高可用架构**
- 多 Master 节点 + 负载均衡
- etcd 集群部署

### 29. **升级与维护**
- 控制平面和节点的版本升级策略
- 滚动更新与回滚机制

---

## 九、扩展与生态工具（进阶）

### 30. **CRD（Custom Resource Definition）**
- 扩展 K8s API，定义自定义资源类型

### 31. **Operator 模式**
- 使用控制器管理复杂应用（如 etcd-operator、Prometheus Operator）
- “运维自动化”思想的体现

### 32. **服务网格（Service Mesh）**
- Istio、Linkerd：实现流量管理、安全、可观测性

### 33. **GitOps 工具**
- Argo CD、Flux：基于 Git 的持续交付模式

---

## 十、学习建议与路径

| 阶段 | 学习内容 | 推荐工具 |
|------|----------|---------|
| 入门 | Pod、Deployment、Service、YAML、kubectl | Minikube、Kind、Play with Kubernetes |
| 中级 | ConfigMap、Secret、Ingress、StatefulSet、Helm | Docker Desktop + K8s、kubeadm |
| 高级 | RBAC、网络策略、Operator、CI/CD 集成 | ArgoCD、Istio、Prometheus |
| 实战 | 多环境部署、监控告警、故障排查 | EKS/GKE/AKS、EFK、Grafana |

---

## 总结：Kubernetes 学习地图

```
基础概念 → 核心对象 → YAML 编写 → 集群搭建 → 网络存储 → 安全权限 → 监控日志 → 高级运维 → 生态工具
```

> 📌 **关键提示**：
> - 动手实践最重要，建议边学边用 `minikube` 或 `kind` 搭建本地环境。
> - 理解“声明式 API”和“控制器模式”是掌握 K8s 的核心思想。
> - 掌握 `kubectl` 命令是日常操作的基础。

---

✅ 掌握以上知识点后，你将具备：
- 独立部署和管理 K8s 集群的能力
- 开发、运维云原生应用的能力
- 构建 CI/CD 流水线、实现自动化运维的能力

Kubernetes 是云原生时代的“操作系统”，值得深入学习和长期投入。