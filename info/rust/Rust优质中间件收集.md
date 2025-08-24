https://github.com/mxsm/rocketmq-rust
https://rocketmq-rust.ljbmxsm.com/docs/run-rocketmq-rust-docker/
podman pull



# 基于 Java 开发
https://github.com/apache/rocketmq
podman pull apache/rocketmq:latest

# Start NameServer
podman run -d \
--name rmqnamesrv \
--network rocketmq \
-p 9876:9876 \
apache/rocketmq:latest \
sh mqnamesrv

docker run -d --name rmqnamesrv -p 9876:9876 --network rocketmq apache/rocketmq:5.3.2 sh mqnamesrv

docker run -d \
--name rmqbroker \
--link rmqnamesrv:namesrv \
-p 10911:10911 \
-p 10912:10912 \
-p 10909:10909 \
-e "NAMESRV_ADDR=namesrv:9876" \
apache/rocketmq:latest \
sh mqbroker


# Configure the broker's IP address
echo "brokerIP1=127.0.0.1" > broker.conf

# Start the Broker and Proxy
podman run -d \
--name rmqbroker \
--network rocketmq \
-p 10912:10912 \
-p 10911:10911 \
-p 10909:10909 \
-p 8080:8080 \
-p 8081:8081 \
-e "NAMESRV_ADDR=rmqnamesrv:9876" \
# In PowerShell, replace %cd% with $pwd
-v ./broker.conf:/home/rocketmq/rocketmq-5.3.2/conf/broker.conf \
apache/rocketmq:latest sh mqbroker --enable-proxy \
-c /home/rocketmq/rocketmq-5.3.2/conf/broker.conf


# 基于 Java 开发
https://github.com/apache/rocketmq-dashboard
podman pull apacherocketmq/rocketmq-dashboard:latest
podman run -d \
--name rocketmq-dashboard \
-e "JAVA_OPTS=-Drocketmq.namesrv.addr=127.0.0.1:9876" \
-p 8082:8082 \
apacherocketmq/rocketmq-dashboard:latest


https://github.com/nacos-group/r-nacos
podman pull qingpan/rnacos:stable

# 开放tcp端口命令  （--permanent永久生效，没有此参数重启后失效）
firewall-cmd --zone=public --add-port=8848/tcp --permanent
firewall-cmd --zone=public --add-port=9848/tcp --permanent
firewall-cmd --zone=public --add-port=10848/tcp --permanent
# 防火墙重新载入
firewall-cmd --reload

podman run -d \
--name nacos-server \
-p 8848:8848 \
-p 9848:9848 \
-p 10848:10848 \
-e MODE=standalone \
-e RNACOS_INIT_ADMIN_USERNAME=admin \
-e RNACOS_INIT_ADMIN_PASSWORD=admin \
-e RNACOS_HTTP_PORT=8848 \
qingpan/rnacos:stable



# Higress 是一款云原生 API 网关，内核基于 Istio 和 Envoy，可以用 Go/Rust/JS 等编写 Wasm 插件，
# 提供了数十个现成的通用插件，以及开箱即用的控制台
# 基于 GO、C++、Rust 语言开发，可以替代传统的 Nginx、Spring Cloud Gateway 网关
https://github.com/alibaba/higress
# 访问面板 http://localhost:8001/


https://github.com/apache/skywalking-rust