## markrun替换

````html
<!--
MARKRUN-CODE
这段文字最终会显示
-->
````

## JS

**source**

    <!--
    {
        title: "some title **support markdown**",
        desc: "some desc **support markdown**",
        close: true,
        lastrun: true,
        html: "<div id="demo" ></div>"
    } -->
    ````js
    console.log('markrun')
    document.getElementById('demo').innerHTML = new Date().getTime()
    ````

**output**

````html
<div class="markrun markrun--close">
    <div class="markrun-html"><div id="demo" ></div></div>
    <div class="markrun-code"><!--SCRIPT-lastrun--></div>
    <div class="markrun-info">
        <div class="markrun-title">some title <strong>support markdown</strong></div>
        <div class="markrun-desc">some desc <strong>support markdown</strong></div>
        <span class="markrun-close"></span>
    </div>
    <div class="markrun-source">
        <span class="markrun-source-copy">Copy</span>
        <pre class="markrun-source-pre" >
            console.log('markrun')
            document.getElementById('demo').innerHTML = new Date().getTime()
        </pre>
    </div>
</div>
<script data-markrun-lastrun="true" >
console.log('markrun')
document.getElementById('demo').innerHTML = new Date().getTime()
</script>
````

`.markrun-source pre` 最终会进行 `highlight` 处理


## html

**source**

    <!--
    {
        title: "some title **support markdown**",
        desc: "some desc **support markdown**",
        close: false
    } -->
    ````html
    <div class="m-btn">some</div>
    ````

**output**

    ````html
    <div class="markrun">
        <div class="markrun-html"></div>
        <div class="markrun-code">
            <div class="m-btn" >some</div>
        </div>
        <div class="markrun-info">
            <div class="markrun-title">some title <strong>support markdown</strong></div>
            <div class="markrun-desc">some desc <strong>support markdown</strong></div>
            <span class="markrun-close"></span>
        </div>
        <div class="markrun-source">
            <span class="markrun-source-copy">Copy</span>
            <pre class="markrun-source-pre" >
                &lt;div class="m-btn"&gt;some&lt;/div&gt;
            </pre>
        </div>
    </div>
    ````

## css

**source**

    <!--
    {
        title: "some title **support markdown**",
        desc: "`" + self.html + "`",
        html: "<div class="democss">democss</div>",
        close: false
    } -->
    ````css
    .democss {
        border:1px solid red;
    }
    ````

**output**

    ````html
    <div class="markrun">
        <div class="markrun-html">
            <div class="democss">democss</div>
        </div>
        <div class="markrun-code">
            <style media="screen">
            .democss {
                border:1px solid red;
            }
            </style>
        </div>
        <div class="markrun-info">
            <div class="markrun-title">some title <strong>support markdown</strong></div>
            <div class="markrun-desc">
                <code>&lt;div class="democss"&gt;democss&lt;/div&gt;</code>
            </div>
            <span class="markrun-close"></span>
        </div>
        <div class="markrun-source">
            <span class="markrun-source-copy">Copy</span>
            <pre class="markrun-source-pre" >
                .democss {
                    border:1px solid red;
                }
            </pre>
        </div>
    </div>
    ````
