pipeline {
    agent any

    environment {
        PATH='/usr/local/bin:/usr/bin:/bin'
    }

    tools {nodejs "node"}

    stages {
        stage('Setup'){
            steps {
                sh 'npm install -g cordova'
                sh 'npm install -g ionic@latest'
                sh 'npm install -g @angular/cli'
                sh 'npm install'
                sh 'npm rebuild node-sass'
            }
        }

        stage('Build'){
            steps {
                sh 'ionic serve'
            }
        }
    }
}