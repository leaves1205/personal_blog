---
title: JAVA
description: learning for java:)
date: 2026-03-21
tags: [全栈]
draft: false
---
# JAVA面试学习

## 1.特点

1. 丰富的外置库
   内置库：.util.*  .io.*
   外置库：处理json等，.class打包成.jar ,目前直接可以在配置文件写依赖，Gson,Jackson,fastjson,**Spring Boot**
2. 面向对象：低耦合，高内聚
   模块模块之间联系低->低耦合 功能集中、单一、相关->高内聚（放的功能都相关）
3. 与平台无关
4. 可靠安全
5. 多线程

## 2.面向对象和面向过程区别

### 面向过程：

解决问题步骤

### 面向对象：

把事务分解成各个对象，封装、继承、多态

## 3.八种基本数据类型大小和分装

|  类型  | 大小 | 默认值       | 封装      |
| :-----: | ---- | ------------ | --------- |
|  byte  | 1    | (byte)0      | byte      |
|  short  | 2    | (short)0     | short     |
|   int   | 4    | 0            | Integer   |
|  long  | 8    | 0L           | long      |
|  float  | 4    | 0.0f         | float     |
| double | 8    | 0.0d         | double    |
| boolean | --   | false        | boolean   |
|  char  | 2    | \u0000(null) | character |

1. int 是基本数据类型，integer是int的封装类（引用类型），int默认值是0，integer是null，integer可以区分0和null，在任何引用使用前必须指定对象
2. 基本数据类型会自动分配空间，引用类型只分配引用空间，数组对象也是引用对象，将一个数组赋值给另一个数组只是复制一个引用，所以通过数组做的修改再另一个数组中也看得见

## 4.标识符的命名规则

**标识符**：自己定义的内容（类的名字，方法名称及变量名称等）

**命名规则（硬性）**：英文字母，0-9数字，$以及_

## 5. instanceof关键字的作用

java的双目运算符，测试一个对象是否是一个类

```
boolean result = obj instanceof Class 
```

obj是一个对象，class是一个类或者一个接口，obj是class的对象返回true，否则是false。obj还可以转换为class也可以true。

```
Integer integer = new Integer(1);
System.out.printIn(integer instanceof Integer); //true,obj为null就直接返回false
```

## 6.java自动装箱与拆箱

装箱：基本数据类型转为包装器类型（int->integer）调用：integer的valueOf（int）方法

拆箱：包装器转基本类型（integer->int） 调用：integer的intvalue

SE5后自动装箱：

```
Integer i = 10;
```

Question:

```java
public class Main {
	public static void main(String[] args){
		Integer i1 = 100;
		Integer i2 = 100;
		Integer i3 = 200;
		Integer i4 = 200;
		System.out.println(i1 == i2);
		System.out.println(i3 == i4);
	}
}
```

output

```java
true
false
```

第一个java队integer做了缓存机制（integer cache）默认范围-127 - 127,在范围内的值是复用一个对象，超出该值就创造新对象

两个变量值指同一个对象

第二个超出缓存范围（127）

所以

i3 = 200； new一个对象

i4 = 200； new一个对象

i3 == i4 // false（不是一个地址）

==：比较int（值） integer（地址）

值比较：

```java
System.out.printIn(i3.equals(i4));
```
