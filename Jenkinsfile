pipeline {
    agent any

    environment {
        PATH='/usr/local/bin:/usr/bin:/bin'
    }

    stages {
        stage('Setup'){
            steps {
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