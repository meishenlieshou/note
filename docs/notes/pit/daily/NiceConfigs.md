---
title: NiceConfigs
createTime: 2025/02/02 18:22:27
permalink: /pit/daily/u1MJrMQzp9YHid/
author: JackSim
tags:
  - Configurations
  - Tools

description: description
---


## Markdown code snippet

This json configs is a code snippet for vscode Markdown editor

```json
{	
  "frontmatter": {
		"prefix": "frontmatter",
		"body": [
			"---",
			"title: ${TM_FILENAME_BASE}",
			"createTime: ${CURRENT_YEAR}/${CURRENT_MONTH}/${CURRENT_DATE} $CURRENT_HOUR:$CURRENT_MINUTE:$CURRENT_SECOND",
			"permalink: /${1:route}/${2:id}/",
			"author: Jack",
			"tags:",
			"  - ${3:tag}",
			"  - ${4:tag}",
			"description: ${5:description}",
			"---",
			"${0}",
			"",
		],
		"description": "通用头部模板"
	},
  //...
}
```
