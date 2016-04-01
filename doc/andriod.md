# 业务模板

```html
    <!-- 内嵌的部分 -->
    <div class="g-main g-main-boss">
        <!-- 二级栏目导航 -->
        <div class="g-tab"></div>
        <!-- 主体业务逻辑 -->
        <div class="g-mnc g-mnc-xx">
            xxxx
        </div>
    </div>
```
## Flex我们一起去踩坑
```html

    <div class="g-mnc g-mnc-xx">
        根据不同的业务逻辑去定内部的布局(row 或者 column)
    </div>
```
```html
    <!-- 如果出现flex失去布局的情况请在多嵌套一层 -->
    <div class="g-row">
        <div class="g-flex-row">

        </div>
    </div>
```
```css
    .g-row{
        position:relative;
    }
    .g-flex-row{
        display:flex;
        flex-direction: row;
    }
    .g-flex-row{
        display:flex;
        flex-direction: column;
    }
```


## 滚动条的替换原则

由于滚动条会占位置，先部分替换
> 原则：全局的滚动条先用原生的替换掉， 模块里面的滚动条，先用自定义的~

# 业务模板

```html
    <!-- 内嵌的部分 -->
    <div class="g-main g-main-boss">
        <!-- 二级栏目导航 -->
        <div class="g-tab"></div>
        <!-- 主体业务逻辑 -->
        <div class="g-mnc g-mnc-xx">
            xxxx
        </div>
    </div>
```
## Flex我们一起去踩坑
```html

    <div class="g-mnc g-mnc-xx">
        根据不同的业务逻辑去定内部的布局(row 或者 column)
    </div>
```
```html
    <!-- 如果出现flex失去布局的情况请在多嵌套一层 -->
    <div class="g-row">
        <div class="g-flex-row">

        </div>
    </div>
```
```css
    .g-row{
        position:relative;
    }
    .g-flex-row{
        display:flex;
        flex-direction: row;
    }
    .g-flex-row{
        display:flex;
        flex-direction: column;
    }
```


## 滚动条的替换原则

由于滚动条会占位置，先部分替换
> 原则：全局的滚动条先用原生的替换掉， 模块里面的滚动条，先用自定义的~


# 业务模板

```html
    <!-- 内嵌的部分 -->
    <div class="g-main g-main-boss">
        <!-- 二级栏目导航 -->
        <div class="g-tab"></div>
        <!-- 主体业务逻辑 -->
        <div class="g-mnc g-mnc-xx">
            xxxx
        </div>
    </div>
```
## Flex我们一起去踩坑
```html

    <div class="g-mnc g-mnc-xx">
        根据不同的业务逻辑去定内部的布局(row 或者 column)
    </div>
```
```html
    <!-- 如果出现flex失去布局的情况请在多嵌套一层 -->
    <div class="g-row">
        <div class="g-flex-row">

        </div>
    </div>
```
```css
    .g-row{
        position:relative;
    }
    .g-flex-row{
        display:flex;
        flex-direction: row;
    }
    .g-flex-row{
        display:flex;
        flex-direction: column;
    }
```


## 滚动条的替换原则

由于滚动条会占位置，先部分替换
> 原则：全局的滚动条先用原生的替换掉， 模块里面的滚动条，先用自定义的~


# 业务模板

```html
    <!-- 内嵌的部分 -->
    <div class="g-main g-main-boss">
        <!-- 二级栏目导航 -->
        <div class="g-tab"></div>
        <!-- 主体业务逻辑 -->
        <div class="g-mnc g-mnc-xx">
            xxxx
        </div>
    </div>
```
## Flex我们一起去踩坑
```html

    <div class="g-mnc g-mnc-xx">
        根据不同的业务逻辑去定内部的布局(row 或者 column)
    </div>
```
```html
    <!-- 如果出现flex失去布局的情况请在多嵌套一层 -->
    <div class="g-row">
        <div class="g-flex-row">

        </div>
    </div>
```
```css
    .g-row{
        position:relative;
    }
    .g-flex-row{
        display:flex;
        flex-direction: row;
    }
    .g-flex-row{
        display:flex;
        flex-direction: column;
    }
```


## 滚动条的替换原则

由于滚动条会占位置，先部分替换
> 原则：全局的滚动条先用原生的替换掉， 模块里面的滚动条，先用自定义的~

