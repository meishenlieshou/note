---
title: Git usage
createTime: 2025/04/10 08:38:43
permalink: /learn/devops/IDadixd/
author: Ziven
tags:
  - Git
  - Code

description: 
---

## How to Manage Tags
```shell

# Add tags
git tag -a v1.0.18_test_20250410 -m "Version description"   #Add a local tag with description
git push origin v1.0.18_test_20250410  #Push the local tag to remote repository

# View tags
git tag  # View tags in local
git ls-remote --tags origin  # View tags in remote

# Delete tags
git tag -d v1.0.18_test_20250410
git push origin --delete v1.0.18_test_20250410  # Push the delete change to remote repository

```

## How to Sync 
```shell
git branch  # To check which branch the current repository is with all the branches listed along
git checkout main # Make sure you are on the right brach
git pull origin main  # This updates your local code with the latest version from the remote main branch. If you are on o different branch(e.g., dev), change main to dev
git add .  # Add your changes
git commit -m "Fix:descriptions for commit" # Commit your changes
git push origin main  # Push your changes to remote
## You can skip the branch name in the following commands if you're already on that branch(via checkout command etc)

## Resolve the merge conflicts
git pull  # Git will stops due to conflicts. 
git status  # List the files with merge conflicts under the Unmerged paths

#1. You need to resolve the conflicts manually, then 
git add <conflicted_file>
git commit

#2. You choose to accept the remote change without merge
git checkout --theirs <conflicted_file>
git add <conflicted_file>
git commit

#3. You choose to accept the local change without merge
git checkout --ours <conflicated_file>
git add <conflicated_file>
git commit

#4. You choose to abort merge and return the branch to the state is was in before you ran git pull
git merge --abort

```




























