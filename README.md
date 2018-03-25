#filter-words
##引入
<code>
    npm install filter-words
</code>
## 用法
<pre>
<code>
    var filterWords=require('filter-words')；
    filterWords(string,function(filterWordsArr,resault){

    })
</code>
</pre>
##词库
>词库为目录下的key.txt文件
>若需增加屏蔽词，可按照word|word的格式向其中增加词组
##优点
*没有依赖
*使用方便