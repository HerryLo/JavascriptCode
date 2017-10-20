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
