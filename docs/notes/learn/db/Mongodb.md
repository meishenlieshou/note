---
title: Mongodb
createTime: 2025/01/19 15:05:36
permalink: /learn/db/JuxxNdMOF6Sk6/
author: Jack
tags:
  - Mongodb
  - 数据库

description: description
---

## 关于MongoDB

MongoDB 是一个开源的、基于文档的 NoSQL 数据库，它采用了文档存储模型，与传统的关系型数据库（如 MySQL、PostgreSQL）不同，MongoDB 使用 BSON（Binary JSON）格式来存储数据。这使得它能够更灵活地处理复杂的数据结构，如嵌套对象和数组。


## 基础知识

### 问题 1: MongoDB 的数据存储格式是什么？

MongoDB 使用 BSON（Binary JSON）格式存储数据。BSON 是一种类似于 JSON 的格式，但它支持更丰富的数据类型，比如二进制数据、日期类型和对象ID。

### 问题 2: 什么是 MongoDB 的副本集（Replica Set）？

MongoDB 的副本集是一组 MongoDB 服务器，这些服务器保存相同的数据集。

### 问题 3: 什么是 MongoDB 的集合（Collection）？

集合是 MongoDB 数据库中的数据组织方式，类似于关系型数据库中的表

### 问题 4: MongoDB 是否支持事务？

从 MongoDB 4.x 版本开始，MongoDB 支持多文档事务，可以保证 ACID（原子性、一致性、隔离性、持久性）特性，允许在多个文档和集合之间进行原子操作。

### 问题 5: MongoDB 中如何创建索引？

MongoDB 支持单字段索引、复合索引、文本索引、地理空间索引等。通过db.collection.createIndex方法创建。

## 查询和操作

### 问题 6: 如何在 MongoDB 中进行复杂查询？

MongoDB 支持多种查询操作，使用db.collection.find方法查询，方法可以对象方式传入复杂检索条件

### 问题 7: 什么是 MongoDB 的聚合（Aggregation）框架？

MongoDB 的聚合框架提供了一种强大的方法来处理和转换数据。通过聚合操作，可以对数据进行分组、排序、过滤、投影、连接等操作。常用的聚合操作符包括 $match、$group、$sort、$project 等。


## 性能和优化

### 问题 8: 如何优化 MongoDB 的查询性能？

- 使用索引
- 合理的批量操作
- 使用聚合管道：在处理大数据量时，通过聚合框架对数据进行处理而不是将数据拉取到应用层进行处理
- 数据分片
  
### 问题 10: MongoDB 中如何进行数据分片？

MongoDB 的分片功能允许将数据分布在多个服务器上，以提高数据存储和查询的扩展性。分片通过选择一个字段作为分片键（Shard Key）来决定数据如何分布。
```Javascript
sh.enableSharding("myDatabase"); // 启用数据库的分片
sh.shardCollection("myDatabase.myCollection", { "field": 1 }); // 启用集合的分片
```

### 问题 11: MongoDB 如何保证高可用性？

MongoDB 通过副本集（Replica Set）提供高可用性。副本集包含一个主节点和多个从节点，数据会自动同步到从节点。若主节点宕机，副本集会自动选举一个新的主节点，保证数据库的高可用性。

## 开源项目Mongoose

Mongoose 是 MongoDB 的一个非常流行的 ODM（对象数据建模）库，专门用于 Node.js。它提供了一种更为结构化和面向对象的方式来与 MongoDB 数据库进行交互。

基本用法
```Javascript
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 * 连接到 MongoDB 数据库
 */ 
mongoose.connect('mongodb://localhost:27017/mydatabase', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Failed to connect to MongoDB', err));


/**
 * 在 Mongoose 中，Schema 是定义文档结构的蓝图，Model 是操作这些文档的构造函数。
 */
const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  age: { type: Number, min: 18 }
});

/**
 * 创建Model
 */ 
const User = mongoose.model('User', userSchema);

/**
 *创建一个新的用户
 */
const newUser = new User({ name: 'Alice', age: 25 });
newUser.save();

/**
 *创建一个新的用户
 */ 
User.create({ name: 'Alice', email: 'alice@example.com', age: 25 })
  .then(user => console.log('User created:', user))
  .catch(err => console.error('Error creating user:', err));

// 查询所有用户
User.find()
  .then(users => console.log('Users:', users))
  .catch(err => console.error('Error fetching users:', err));

// 根据邮箱查找用户
User.findOne({ email: 'alice@example.com' })
  .then(user => console.log('User found:', user))
  .catch(err => console.error('Error fetching user:', err));

// 根据用户 ID 查找用户
User.findById('60b9d1e5f4f9e2285cb9e563')
  .then(user => console.log('User found:', user))
  .catch(err => console.error('Error fetching user:', err));

// 查询年龄大于等于 25 的用户
User.find({ age: { $gte: 25 } })
  .then(users => console.log('Users found:', users))
  .catch(err => console.error('Error fetching users:', err));


// 更新单个用户的年龄
User.updateOne({ email: 'alice@example.com' }, { $set: { age: 26 } })
  .then(result => console.log('Update result:', result))
  .catch(err => console.error('Error updating user:', err));

// 根据邮箱删除用户
User.deleteOne({ email: 'bob@example.com' })
  .then(result => console.log('User deleted:', result))
  .catch(err => console.error('Error deleting user:', err));

// 聚合操作：按年龄分组并计算每组的用户数量
// 支持 MongoDB 的聚合管道，用于对数据进行复杂的操作（如分组、排序、过滤等）
User.aggregate([
  { $group: { _id: '$age', count: { $sum: 1 } } }
])
  .then(result => console.log('Aggregation result:', result))
  .catch(err => console.error('Error with aggregation:', err));


```
