# git中得命令




## 将文件存在暂存区
```javascript
1.查看一个修改过但是还没 commit 的文件具体改了什么
$ git diff '[filename]'

2.查看历史记录
$ git log

3.备份当前的工作区的内容，从最近的一次提交中读取相关内容，让工作区保证和上次提交的内容一致。同时，将当前的工作区内容保存到Git栈中。
$ git stash 

4.从Git栈中读取最近一次保存的内容，恢复工作区的相关内容。由于可能存在多个Stash的内容，所以用栈来管理，pop会从最近的一个stash中读取内容并恢复。
$ git stash pop 
````

## 合并分支
创建子分支并保持
```javascript
1.创建一个子分支，同时切换到子分支

$ git branch dev  // 创建分支dev

$ git checkout dev  // 切换分支到dev
>   修改文件README.md文件的内容最后一行修改为: 
>   '创建vue项目'

$ git add README.md //添加到缓存区

$ git commit -m 'dev修改'
```

主分支修改

```javascript
$ git branch master
>   修改文件README.md文件的内容最后一行修改为: 
>   'create vuejs project'

$ git add README.md //添加到缓存区

$ git commit -m 'master修改'


$ git merge dev // 将dev内容**合并**到master上

说明:
>   会出现冲突 ，HEAD为当前代码，删除HEAD即可

$ git add README.md //添加到缓存区

$ git commit -m 'master修改'

$ git log --graph --pretty=oneline --abbrev-commit  // 查看分支的合并情况

$ git branch -d dev  // 删除dev分支
```

## git中修改head指向
```javascript
$   git branch -r // 查看本地head指向

$   git remote set-head origin -d // 删除origin/head

$   git remote set-head origin maser // 设置 head指向
```

## git放弃本地修改 强制更新
```javascript
$ git fetch --all

$ git reset --hard origin/master // 远程分支名称

<!--git fetch 只是下载远程的库的内容，不做任何的合并 git reset 把HEAD指向刚刚下载的最新的版本-->
```

```
**参考资料:** [廖雪峰教你git命令行](https://www.liaoxuefeng.com/wiki/0013739516305929606dd18361248578c67b8067c8c017b000/001375840202368c74be33fbd884e71b570f2cc3c0d1dcf000)
