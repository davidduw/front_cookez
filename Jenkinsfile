pipeline {
    agent any

    deleteDir()

    tools {nodejs "node"}

    stages {
        stage('Setup'){
            steps {
                sh 'npm install -g cordova ionic'
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