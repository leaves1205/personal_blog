---
title: JAVA
description: learning for java:)
date: 2026-03-21
tags: [algorithm]
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

如果是浮点数，System.out.PrintIn(i1 == i 2) 也是false， 因为浮点数在范围内是无限的

## 7.重载和重写的区别

**重写（override）**

子类把父类本身的方法重写一遍，子类继承父类原有方法，方法名，参数列表和返回类型相同，public >protected>default> private

```
public class Father {
	public static void main(String[] args){
		Son s = new Son();
		s.sayHello();
	}
	pubilc void sayHello(){
		system.out.printIn("Hello");
	}
}
class Son extends Father{
	public void sayHello(){
		System.out.printIn("hello by");
	}
}
```

1.发生在父类与子类之间，2.方法名，参数列表，返回类型必须相同。3.访问修饰符的限制一定要大于被重写方法的访问修饰符（public >protected >default> private) 4. 重写方法一定不能抛出新的检查异常或者比被重写方法申明更加宽泛的检查型异常。

重载(overload)

同名方法有不同参数列表（参数类型不同，个数不同，顺序不同）

```java
public class Father {
	public static void main(String[] args){
		Father s = new Father();
		s.sayHello();
		s.sayHello("wintershii");
	}
	public void sayHello() {
		System.out.printIn("Hello");
	}
	public void sayHello(String name){
		System.out.printIn("Hello"+" "+name);
	}
}

```

## 8.equals和==区别

==：比地址是否相同（指针操作）

equals：内容是否相等

summary: 比较是否相等，都用equals且在对常量相比较时，把常量写在前面，因为使用object的equals object可能为null 则为空指针

## 9.hashcode作用

一类list 一类set，前者有序可重复，后者无序不重复。插入判断已存在（equals）

用hash算法提高集合中查找元素的效率，将集合分为诺干区域每个对象计算一个hash码。

hashcode：返回是根据对象的内存地址换算出的一个值，当集合要添加新元素，先调用这个元素的hashcode，就可以定位到放置的物理位置上，这个位置没有元素就可以直接储存在这个位置上，不再进行比较。有元素就调用这个元素和新元素比较，相同的不存，不相同的散列其他地址。这样调用equals方法的次数就降低了。

## string，string stringbuffer 和stringbuilder的区别

string是只读字符，是对象，从底层源码来看是final类型的字符数组，所引用的字符串不能被改变，一经定义无法增删改，每次对string的操作都会生成新的string对象。

```java
private final char value[];
```

每次+操作：隐式在堆上new了一个跟源字符串相同的string builder对象，再调用append方法 拼接+后面的字符

stringbuffer和string builder都继承了abstractstringbuilder抽象类

```java
char[] value;
```

底层都是可变的字符数组，使用string buffer和stringbuilder操作，string buffer有同步锁线程安全，stringbuilder非线程安全。

## arraylist和linkedlist区别

array是基于index的数据结构，使用索引在数组中搜索和读取数据很快

array的时间复杂度是O(1),删除数据开销很大，需要重拍数据

int[] a = new int[4]

int c[] = {23,43,67,78}

list是一个有序的集合，可以包含重复的元素，提供了按索引访问的方式，继承collection

list有两个实现类：arraylist和linkedlist

arraylist：自动增长容量的数组，toArray返回一个数组，asList返回一个列表

linklist是双链表，在增加删除性能更好，但是get和set弱于arraylist

## HashMap和Hashtable区别

### 两者父类不同

hashmap继承abstractmap hashtable继承dictionary。实现了map，clonable，serializable

### 对外的接口不同 

hashtable比hashmap多提供了elements和contains两个方法，elements继承hashtable的父类dictionary。elements的方法用于返回此hashtable中的value枚举

contains的方法判断该hashtable是否包含传入的value，作用和containsvalue一致。

### 对null支持不同

hashtable：都不能为null

hashmap：key可以null，有多个key的value为null

### 安全性不同：

hashmap会产生死锁，要处理**多线程**问题，但效率高，

hashtable是线程安全，可以直接用于多线程中，都有synchronized关键字。

concurrenthashmap：线程安全，效率比hashtable高，使用了分段锁。

### 初始容量大小和每次扩容大小不同

### 计算hash值的方法不同

## HashMap中的key可以使用任何类作为key吗

类重写了equals方法，也要重写hashcode

类的所有实例需要遵循equals和hashcode相关的规则

如果一个类没有equals就不能在hashcode中使用它

## hashmap长度为什么是2的n次方

让hashmap存数据和取数据的效率高，尽可能减少hash值的碰撞，尽量把数据能均匀的分配，每个链表或者红黑树的长度尽量相等

%取模来实现，使用二进制操作&可以提高运算效率

## collection包结构和collections的区别

collection是集合类的上级接口，子接口有set,list,linkedlist,arraylist,vector,stack,set

collections是集合类的一个帮助类，有各种有关集合操作的静态多态方法，实现对各种集合的搜索，排序，线程安全化等操作，不能实例化，像一个工具类服务于java的collection框架

## java的四种引用，强弱软虚

* 强引用：平常中使用最多的引用，在OOM的时候也不会被回收

  ```java
  String str = new String("str");
  System.out.printIn(str);
  ```
* 软引用：程序内存不足时，会被回收

  ```
  SoftReference<String> wrf = new SoftReference<String>(new String("Str"));
  ```
* 弱引用：JVM垃圾回收器发现了它就会 回收

```java
WeakReference<String> wrf = new WeakReference<String>(str);
```

虚引用：回收之前放入ReferenceQueue

```java
PhantomReference<String> prf = new PhantomReference<String>(new String("str"),
new referenceQueue<>())
```

## 泛型常用特点

泛型：泛指的类型，Arraylist就是，作为集合可以存放各种元素。Integer string 自定义的各种类型

```java
List<Integer>iniData=new ArrayList<>()
```

不用为了不用的类型而定义不同类型的集合

## JAVA创建对象有几种方式

* new创建新对象
* 通过反射机制
* 采用clone机制
* 通过序列化机制

## 两个不相等的对象有相同的hashcode

在产生hash冲突的时候两个不相等的对象就会有相同的hashcode。有三种方法处理

* 拉链发：每个哈希表节点都有一个next指针，多个哈希表节点可以用next指针构成一个单项链表，被分配到同意索引上的多个节点可以用这个单向链表进行储存

* 开放定址法：冲突就去找下一个空的散列地址
* 在哈希：使用第二个第三个哈希函数计算地址直到没有冲突

## 深拷贝和浅拷贝

* 浅拷贝：复制的对象的变量和原来的对象值相同，但是所有其他对象的引用依然指向原来的对象
* 深拷贝：其他对象指向被复制过的新对象

## Final的用法

* 类不可被继承
* 方法不可被重写

* 变相不可被改变

* JVM尝试内联提高效率
* 编译阶段存在于常量池

## static有哪些用法：

static：静态变量和静态方法，被static所修饰的变量/方法都属于类的静态资源

static也用于静态块，多用于初始化操作：

```java
public class PreCache{
	static{
	//相关操作
	}
}
```

static也多用于修饰内部类，俗称静态内部类

import static引入某个类中的静态资源且不用使用类名

```java
import static java.lang.math.*;
public class Test{
	public static void main(string[] args){
	system.out.printIn(sin(20));
	}
}
```

## a = a+ b 和a+=b区别

+= 隐式自动转换，a = a + b 不能自动进行转换

## try catch finally, try 里有return， finally还执行吗

执行，finally执行早于return

## exception与error包结构

java可抛出的结构为三类型：被检查的异常（checkedException），运行时异常（RuntimeException），错误（error)

1. 运行时异常

RuntimeException及其子类被称为运行时异常

Java编译器不会检查他，当程序中出现这类异常没有用throws或者用try-catch捕获还是会编译通过。fail-fast:并发修改异常

常见五种运行时异常：

* ClassCastException

* IndexOutOfBoundsException
* NullPointerException
* ArrayStoreException
* BufferOverflowException

2. 被检查异常

exception类本身及子类中除了“运行时异常之外”其他的子类都属于被检查异常

java会检查他，要么通过throws声明抛出要么通过try-catch进行捕获处理，否则不能通过编译，被检查异常都可以回复。

IOException

FileNotFoundException

SQLException

3. 错误

和运行异常一样，编译器也不会对错误进行检查

OOM Error ThreadDeath

## OOM有哪些情况，SOF有哪些情况

OOM：

1. outofmemory异常

java heap溢出：

一般异常:java.lang.OutOfMemoryError：java heap spaces.

java堆用于储存对象实例，不断创造对象并保证GC Roots到对象之间有可达路径来避免垃圾回收机制清除这些对象，就会在对象数量达到最大堆容量限制猴产生内存溢出的异常

解决方法：内存映像分析工具堆dump出来的堆转存快照进行分析，确认内存中对象是否必要，是memory leak还是memory overflow

内存泄漏：通过工具查看泄露对象到GCRoots的引用链

2. 虚拟机栈和本地方法栈的溢出

线程请求的栈深度大于虚拟机所允许的最大深度则抛出StackOverflowError异常

虚拟机在扩展栈时无法申请到足够空间-----OutOfMemoryError

3. 运行时常量池溢出

java.lang.OutOfMemoryError：PermGenspace

向运行时常量池中添加内容，用string.intern()。如果池中已经包含一个等于此string的字符串，则返回代表池中这个字符串的string对象。否则加入常量池中并返回string对象的引用

4. 方法区的溢出

方法区存放class相关信息，如类名，访问修饰符，常量池，字段描述，方法描述

java.lang.OutofMemoryError:PermmGenspace

SOF(StackOverflow):

应用程序递归太深发生堆栈溢出抛出错误

栈溢出：递归调用，大量循环或者死循环，全局变量是否过多，数组，list，map数据过大

## 简述线程、程序、进程的基本概念以及关系：

线程和进程相似，但线程是比进程更小的执行单位，一个进程过程中有多个线程，同类的多个线程共享一块内存空间和一组资源。切换线程负担比进程小

程序是含有指令和数据的文件，存储与磁盘或其他数据储存设备中，程序是静态代码

进程是程序的一次执行过程是系统运行程序的基本单位，进程是动态的，系统运行一个程序，一个程序从创建运行到消亡的过程，一个进程就是一个执行中的程序，计算机中一个指令接着一个指令的进行中，每个进程还占有系统资源。

## java序列化中如果有些字段不想进行序列化

使用transient关键字修饰

作用：阻止实例中那些用此关键字修饰的变量序列化，当对象被反序列化，被修饰的变量值不会持久化和回复。transient只能修饰变量不能修饰类和方法

## java中的io流

* 流向：输入输出
* 操作单元：字节流和字符流

* 流的角色：节点流和处理流

IO流从4个抽象类基类中派生出来的

InputStream/Reader：所有的输入流的基类，前者是字节输入流后者是字符输入流

OutputStream/Writer：所有输出流的基类，前者是字节输出流后者是字符输出流

## java io与NIO的区别

NIO是new io，nio用块

## java反射的作用原理

1. 反射机制在运行时，对于任意一个类，都能知道这个类所有的属性和方法，对于任意对象都能调用他的任意一个方法。在java中给定类的名字就可以通过反射机制来获得类的所有信息

2. 哪里用反射机制

jdbc 

```java
Class.forNam('com.mysqljdbc.Driver.class)
```

3. 反射实现方法

获取class对象：1.Class.forName 2. .class 3. .getClass() 4.基本类型的包装类，可以调用包装类的Type属性来获得包装类的class对象

4. 实现java反射的类

1.class：表示正在运行的java应用程序中的类和接口 2. field：提供有关类和接口的属性信息及动态访问权限 3.constructor：提供关于类的单个构造方法的信息以及它的访问权限 4.method：提供类或接口中某个方法的信息

5. 反射机制的优缺点

优点：1.运行时动态获得类的实例 2.与动态编译结合 缺点：1.使用反射性能较低，需要解析字节码，将内存中的对象进行解析 

解决方法：1.setAccessible(true) 2.多次创建一个类的实例有缓存会快很多 3.ReflectASM工具类

## List，Set和Map三者区别：

list:list接口存储一组不唯一，有序的对象

set：不允许重复的集合，不会有多个元素引用相同的对象

map：使用键值对存储，map会维护与key有关联的值，两个key可以引用相同的对象，但是key不能重复，典型的key是string类型也可以是任何对象

## object有哪些常用方法？

java.lang.Object

clone:

实现对象的浅复制，只有实现了Cloneable接口才可以调用该方法，否则抛出CloneNotSupportedException

Finalize：

和垃圾收集器油管，判断一个对象可以被回收最后一步就是判断是否重写此方法

equals：

使用高，在object中和==一样

hashcode：

哈希寻找，重写equals一般都要重写hashcode

wait：

配合synchronized使用，wait方法就是使当前线程等待该对象的锁，当前线程必须是该对象的拥有者，也就是具有该对象的锁，wait()方法一直等待直到获得锁或者被中断。wait(long timeout)

notify:

配合synchronized 唤醒在该对象上等待队列中的某个线程

notifyAll：

配合synchronized 唤醒在该对象上等待队列中的所有线程

Object是所有类的根和父类，所有对象包括数组都实现了object的方法

## java创建对象有几种方式

使用**new**关键字

```java
User user = new User()
```

使用**反射方式**创建：newInstance()

使用**clone**方式：clone是object的方法

使用**反序列化**创建对象，调用Objectinputstream的readobject()方法

## 获取一个class对象方式

getclass()

```java
class<?> class = user.getClass();
```

静态成员表示：

```java
Class<?> clazz = User.class
```

forName

```java
class<?> ckazz = Class.forNmae("com.tian.User")
```

## 红黑树的特征

1. 每个节点是黑色或者红色

2. 根节点是黑色

3. 每个叶子节点是红色，其子节点必须是黑色

4. 一个叶子节点是红色，其子节点必须都是黑色

5. 从一个节点到该节点的子孙节点的所有路径上包含相同数目的黑节点

## java异常

try-catch-finally

* try负责监控可能出现异常的代码
* catch负责捕捉可能出现的异常

* finally清理各种资源
* try必须，catch和finally至少存在一个标准异常处理流程

经常使用自定义异常，继承java.lang.exception,runtime 用jaa.alng.RuntimeException

# JVM篇

JVM是java运行基础，内存模型，类加载机制，GC是重点，编译器优化和执行模式偏理论基础

内存模型各部分作用

类加载双亲委派加载机制

GC粉黛回收的思想和依据，以及不同垃圾回收算法的回收思路和适合场景

性能调优常有JVM优化参数作用

执行模式。。。

## JVM构成
