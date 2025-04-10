import{_ as n,c as i,a,o as e}from"./app-C0y-7IOt.js";const l={};function p(t,s){return e(),i("div",null,s[0]||(s[0]=[a(`<p>This file contains a Jenkins pipeline script written in Groovy. It defines a Jenkins pipeline that automates the process of building, testing, and deploying a project. Here&#39;s a breakdown of how it works:</p><div class="language-python line-numbers-mode" data-ext="python" data-title="python"><button class="copy" title="Copy code" data-copied="Copied"></button><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code><span class="line"><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">//</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;"> Function to send notifications to Telegram</span></span>
<span class="line"><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">def</span><span style="--shiki-light:#59873A;--shiki-dark:#80A665;"> notifyTelegram</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">()</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;"> {</span></span>
<span class="line"><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">    //</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;"> Define Telegram group </span><span style="--shiki-light:#A65E2B;--shiki-dark:#C99076;">ID</span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;"> and</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;"> bot token</span></span>
<span class="line"><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">    def</span><span style="--shiki-light:#A65E2B;--shiki-dark:#C99076;"> GROUP_ID</span><span style="--shiki-light:#999999;--shiki-dark:#666666;"> =</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77;"> &quot;</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;">-4781302032</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77;">&quot;</span></span>
<span class="line"><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">    def</span><span style="--shiki-light:#A65E2B;--shiki-dark:#C99076;"> TOKEN_ID</span><span style="--shiki-light:#999999;--shiki-dark:#666666;"> =</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77;"> &quot;</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;">5565174183:AAHX3xouHwDCs1Z4UEIyUyNdGWIuJLAWvTc</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77;">&quot;</span></span>
<span class="line"><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">    //</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;"> Get environment variables</span></span>
<span class="line"><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">    def</span><span style="--shiki-light:#A65E2B;--shiki-dark:#C99076;"> JOB_NAME</span><span style="--shiki-light:#999999;--shiki-dark:#666666;"> =</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;"> env</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">.</span><span style="--shiki-light:#A65E2B;--shiki-dark:#C99076;">JOB_NAME</span></span>
<span class="line"><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">    def</span><span style="--shiki-light:#A65E2B;--shiki-dark:#C99076;"> BUILD_ID</span><span style="--shiki-light:#999999;--shiki-dark:#666666;"> =</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;"> env</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">.</span><span style="--shiki-light:#A65E2B;--shiki-dark:#C99076;">BUILD_ID</span></span>
<span class="line"><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">    def</span><span style="--shiki-light:#A65E2B;--shiki-dark:#C99076;"> GIT_BRANCH</span><span style="--shiki-light:#999999;--shiki-dark:#666666;"> =</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;"> env</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">.</span><span style="--shiki-light:#A65E2B;--shiki-dark:#C99076;">GIT_BRANCH</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">    //</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;"> Get build change description</span></span>
<span class="line"><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">    def</span><span style="--shiki-light:#A65E2B;--shiki-dark:#C99076;"> CHANGES</span><span style="--shiki-light:#999999;--shiki-dark:#666666;"> =</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;"> sh</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">(</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">script</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">:</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77;"> &quot;&quot;&quot;</span></span>
<span class="line"><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;">        curl --user admin:114b257b7077e01f2f8080580235d921a5 --silent http://127.0.0.1:8080/job/$</span><span style="--shiki-light:#A65E2B;--shiki-dark:#C99076;">{JOB_NAME}</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;">/lastBuild/changes | grep detail | grep &#39;&lt;li&gt;&#39; | sed &#39;s/&lt;li&gt;/</span><span style="--shiki-light:#A65E2B;--shiki-dark:#C99076;">\\\\</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;">n/g&#39; | cut -d&#39;(&#39; -f1 | tail -n +2 | awk &#39;{print NR &quot;. &quot; \\$0}&#39;</span></span>
<span class="line"><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77;">    &quot;&quot;&quot;</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">,</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;"> returnStdout</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">:</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;"> true</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">).</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">trim</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">()</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">    //</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;"> Construct message content</span></span>
<span class="line"><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">    def</span><span style="--shiki-light:#A65E2B;--shiki-dark:#C99076;"> MSG</span><span style="--shiki-light:#999999;--shiki-dark:#666666;"> =</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77;"> &quot;</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;">&lt;b&gt;项目：$</span><span style="--shiki-light:#A65E2B;--shiki-dark:#C99076;">{JOB_NAME}</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;">&lt;/b&gt;</span><span style="--shiki-light:#A65E2B;--shiki-dark:#C99076;">\\n</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77;">&quot;</span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;"> +</span></span>
<span class="line"><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77;">              &quot;</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;">&lt;pre&gt;构建ID: \${BUILD_ID}</span><span style="--shiki-light:#A65E2B;--shiki-dark:#C99076;">\\n</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77;">&quot;</span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;"> +</span></span>
<span class="line"><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77;">              &quot;</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;">分支: \${GIT_BRANCH}</span><span style="--shiki-light:#A65E2B;--shiki-dark:#C99076;">\\n</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77;">&quot;</span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;"> +</span></span>
<span class="line"><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77;">              &quot;</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;">更新描述:</span><span style="--shiki-light:#A65E2B;--shiki-dark:#C99076;">\\n</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77;">&quot;</span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;"> +</span></span>
<span class="line"><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77;">              &quot;</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;">\${CHANGES}&lt;/pre&gt;</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77;">&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">    //</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;"> Send Telegram message</span></span>
<span class="line"><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">    sh </span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77;">&quot;&quot;&quot;</span></span>
<span class="line"><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;">        curl -X POST --data chat_id=&quot;$</span><span style="--shiki-light:#A65E2B;--shiki-dark:#C99076;">{GROUP_ID}</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;">&quot; --data-urlencode &quot;text=$</span><span style="--shiki-light:#A65E2B;--shiki-dark:#C99076;">{MSG}</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;">&quot; &quot;https://api.telegram.org/bot$</span><span style="--shiki-light:#A65E2B;--shiki-dark:#C99076;">{TOKEN_ID}</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;">/sendMessage?parse_mode=HTML&quot;</span></span>
<span class="line"><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77;">    &quot;&quot;&quot;</span></span>
<span class="line"><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-groovy line-numbers-mode" data-ext="groovy" data-title="groovy"><button class="copy" title="Copy code" data-copied="Copied"></button><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code><span class="line"><span>//A pipeline in Jenkins is a suite of plugins that supports implementing and integrating continuous delivery pipelines into Jenkins. It allows you to define the entire workflow of your build, test, and deploy process as code. This code is typically written in Groovy and is stored in a Jenkinsfile.</span></span>
<span class="line"><span>pipeline {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    //the agent any directive specifies that the pipeline can run on any available Jenkins agent (also known as a node or executor). This means that Jenkins will select any available agent to execute the pipeline stages.</span></span>
<span class="line"><span>    agent any</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    //the environment block is used to define environment variables that will be available to all stages within the pipeline. These variables can be used to store configuration values, paths, credentials, and other information that is needed during the execution of the pipeline.</span></span>
<span class="line"><span>    environment {</span></span>
<span class="line"><span>        // Define environment variables</span></span>
<span class="line"><span>        GO_PATH = &quot;/usr/local/go/bin/go&quot;   // Path to the Go binary</span></span>
<span class="line"><span>        DOCKER_REGISTRY = &quot;registry.3333d.vip&quot;  //Docker registry URL</span></span>
<span class="line"><span>        APP_DIR = &quot;/data/bxbw-dev/\${JOB_NAME}&quot;  //Directory where the application is stored.</span></span>
<span class="line"><span>        GIT_REPO = &quot;http://43.199.1.126:9099/Brazilian/brazilianbaowang-h5.git&quot;  //Git repository URL, where the source code placed</span></span>
<span class="line"><span>        GIT_CREDENTIALS_ID = &quot;fe58594e-66a0-46de-a15e-587ab3cda744&quot;   //Credentials ID for accessing the Git repository.????</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    //the stages block is used to define a sequence of stages that the pipeline will execute. Each stage represents a distinct phase in the pipeline, such as building, testing, or deploying the application. Stages help organize the pipeline into logical steps and can contain multiple steps that define the actions to be performed.</span></span>
<span class="line"><span>    stages {</span></span>
<span class="line"><span>        stage(&#39;Checkout&#39;) {</span></span>
<span class="line"><span>            steps {</span></span>
<span class="line"><span>                script {</span></span>
<span class="line"><span>                    // Checkout code from Git repository</span></span>
<span class="line"><span>                    checkout([</span></span>
<span class="line"><span>                        $class: &#39;GitSCM&#39;,</span></span>
<span class="line"><span>                        branches: [[name: &#39;*/new-dev&#39;]],</span></span>
<span class="line"><span>                        userRemoteConfigs: [[</span></span>
<span class="line"><span>                            url: GIT_REPO,</span></span>
<span class="line"><span>                            credentialsId: GIT_CREDENTIALS_ID</span></span>
<span class="line"><span>                        ]]</span></span>
<span class="line"><span>                    ])</span></span>
<span class="line"><span>                }</span></span>
<span class="line"><span>            }</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        stage(&#39;Prepare&#39;) {</span></span>
<span class="line"><span>            steps {</span></span>
<span class="line"><span>                // You can run sh/bat/PowerShell command in the script, based on which environment the Jenkin deploied</span></span>
<span class="line"><span>                script {</span></span>
<span class="line"><span>                    // Install npm dependencies</span></span>
<span class="line"><span>                    sh &quot;npm install&quot;</span></span>
<span class="line"><span>                }</span></span>
<span class="line"><span>            }</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        stage(&#39;Build&#39;) {</span></span>
<span class="line"><span>            steps {</span></span>
<span class="line"><span>                script {</span></span>
<span class="line"><span>                    // Build the project</span></span>
<span class="line"><span>                    sh &quot;&quot;&quot;</span></span>
<span class="line"><span>                        npm run build:green</span></span>
<span class="line"><span>                    &quot;&quot;&quot;</span></span>
<span class="line"><span>                }</span></span>
<span class="line"><span>            }</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        stage(&#39;Set Version&#39;) {</span></span>
<span class="line"><span>            steps {</span></span>
<span class="line"><span>                script {</span></span>
<span class="line"><span>                    // Set the version based on tag or current date and time</span></span>
<span class="line"><span>                    env.VERSION = env.tag ?: sh(script: &quot;date +%Y%m%d%H%M%S&quot;, returnStdout: true).trim()</span></span>
<span class="line"><span>                    echo &quot;Version set to: \${env.VERSION}&quot;</span></span>
<span class="line"><span>                }</span></span>
<span class="line"><span>            }</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        stage(&#39;Build Docker Image&#39;) {</span></span>
<span class="line"><span>            steps {</span></span>
<span class="line"><span>                script {</span></span>
<span class="line"><span>                    // Build Docker image</span></span>
<span class="line"><span>                    sh &quot;&quot;&quot;</span></span>
<span class="line"><span>                        docker build -t \${DOCKER_REGISTRY}/\${JOB_NAME}:\${VERSION} .</span></span>
<span class="line"><span>                    &quot;&quot;&quot;</span></span>
<span class="line"><span>                }</span></span>
<span class="line"><span>            }</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        stage(&#39;Push Docker Image&#39;) {</span></span>
<span class="line"><span>            steps {</span></span>
<span class="line"><span>                script {</span></span>
<span class="line"><span>                    // Push Docker image to registry</span></span>
<span class="line"><span>                    sh &quot;&quot;&quot;</span></span>
<span class="line"><span>                        docker push \${DOCKER_REGISTRY}/\${JOB_NAME}:\${VERSION}</span></span>
<span class="line"><span>                    &quot;&quot;&quot;</span></span>
<span class="line"><span>                }</span></span>
<span class="line"><span>            }</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        stage(&#39;Deploy&#39;) {</span></span>
<span class="line"><span>            steps {</span></span>
<span class="line"><span>                script {</span></span>
<span class="line"><span>                    // Deploy the application using Kubernetes</span></span>
<span class="line"><span>                    sh &quot;&quot;&quot;</span></span>
<span class="line"><span>                        cd \${APP_DIR}</span></span>
<span class="line"><span>                        sed -i &quot;s|image:.*|image: \${DOCKER_REGISTRY}/\${JOB_NAME}:\${VERSION}|g&quot; deployment.yaml</span></span>
<span class="line"><span>                        kubectl apply -f deployment.yaml </span></span>
<span class="line"><span>                        kubectl apply -f service.yaml</span></span>
<span class="line"><span>                    &quot;&quot;&quot;</span></span>
<span class="line"><span>                }</span></span>
<span class="line"><span>            }</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    post {</span></span>
<span class="line"><span>        success {</span></span>
<span class="line"><span>            script {</span></span>
<span class="line"><span>                // Notify on successful build</span></span>
<span class="line"><span>                notifyTelegram()</span></span>
<span class="line"><span>            }</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>        failure {</span></span>
<span class="line"><span>            // Log failure message</span></span>
<span class="line"><span>            echo &quot;Pipeline failed. Please check the logs.&quot;</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,3)]))}const r=n(l,[["render",p]]),c=JSON.parse('{"path":"/learn/devops/doOuFJmkxx/","title":"Jenkins Workflow Example","lang":"en-US","frontmatter":{"title":"Jenkins Workflow Example","createTime":"2025/03/04 09:12:09","permalink":"/learn/devops/doOuFJmkxx/","author":"Ziven","tags":["Jenkins","Pipline"],"description":"description","head":[["meta",{"property":"og:url","content":"https://duduainy.top/learn/devops/doOuFJmkxx/"}],["meta",{"property":"og:site_name","content":"Seasoned Jack"}],["meta",{"property":"og:title","content":"Jenkins Workflow Example"}],["meta",{"property":"og:description","content":"description"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"en-US"}],["meta",{"property":"og:updated_time","content":"2025-04-10T07:32:34.000Z"}],["meta",{"property":"article:author","content":"Ziven"}],["meta",{"property":"article:tag","content":"Jenkins"}],["meta",{"property":"article:tag","content":"Pipline"}],["meta",{"property":"article:modified_time","content":"2025-04-10T07:32:34.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Jenkins Workflow Example\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2025-04-10T07:32:34.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Ziven\\"}]}"]]},"headers":[],"readingTime":{"minutes":2.04,"words":612},"git":{"updatedTime":1744270354000},"filePathRelative":"notes/learn/devops/2.JenkinsDep.md","bulletin":false}');export{r as comp,c as data};
