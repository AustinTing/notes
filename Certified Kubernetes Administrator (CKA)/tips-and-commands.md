# Tips and Commands


# Tips

取得現有 Pod 的 YAML 定義

- `kubectl get pod [pod-name] -o yaml --export > my-nginx-pod.yaml`

生成 Pod 的 YAML 定義

- `kubectl run my-nginx-pod --image=nginx --dry-run=client -o yaml > my-nginx-pod.yaml`

生成 Deployment 的 YAML 定義

- `kubectl create deployment my-nginx-deployment --image=nginx --dry-run=client -o yaml > my-nginx-deployment.yaml`

如果對某個組件不熟，可以使用 explain 來查看

- `kubectl explain replicaset`


# Commands

kubectl **run** [name] --image=[image] --restart=[restart-policy]: 創建 Pod

- `kubectl run nginx --image=nginx --restart=Never`

kubectl **create** -f [file]: 創建資源。如果資源已經存在，則會報錯。

kubectl **apply** -f [file]: 創建或更新資源

kubectl **get** [resource]: 取得資源列表

- `kubectl get pods`
- `kubectl get replicasets` or `kubectl get rs`
- `kubectl get all`
- `kubectl get pods --all-namespaces`

kubectl **describe** [resource] [resource-name]: 取得資源的詳細資訊

- `kubectl describe pod [pod-name]`
- `kubectl describe replicaset [replica-set-name]`

kubectl **delete** [resource] [resource-name]: 刪除資源

kubectl **edit** [resource] [resource-name]: 編輯資源

- `kubectl edit replicaset [replica-set-name]`: 編輯 ReplicaSet 。
- 要注意編輯完會立刻生效。
- 但是現有的 Pod 不會被刪除，只有當 Pod 被刪除後，ReplicaSet 才會根據配置創建新的 Pod。

kubectl **scale** [resource] [resource-name] **--replicas=**[number]: 調整資源的數量

- `kubectl scale replicaset new-replica-set --replicas=3`: 調整 ReplicaSet 的 Pod 數量為 3。 
  - 要注意 `--replicas` 有 s 。
- `kubectl scale --replicas=3 -f replicaset-definition.yaml`: 也可以使用 yaml 檔案來調整數量。
  - 但這樣做的話，不會改變 yaml 檔案中的 replicas 的數量，只會在記憶體中改變。

kubectl **config** set-context $(kubectl config current-context) --namespace=dev

- 設定當前的 context 的 namespace 為 dev。

kubectl **expose** [resource] [resource-name] --type=[service-type] --name=[service-name] --port=[port]: 暴露服務，也是創建服務的一種方式

- `kubectl expose pod my-nginx-pod --type=NodePort --name=my-nginx-service --port=80` 
  - 幾乎相同於 `kubectl create service nodeport my-nginx-service --tcp=80:80 --node-port=30080`
  - 差別在於用 expose 時，pod's label 會被自動加入到 service 的 selector 中。
  - 但是用 create service 時，要自己加入 selector。

