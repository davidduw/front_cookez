pipeline {
    agent any

    tools {nodejs "node"}

    stages {
        stage('Setup'){
            steps {
                sh 'npm install -g cordova'
                sh 'npm install -g ionic@latest'
                sh 'npm install -g @angular/cli'
                sh 'npm install'
                sh 'npm rebuild node-sass'
                sh 'echo ----------------------- COUCOU -----------------------'
                sh 'echo $PATH'
            }
        }

        stage('Build'){
            steps {
                sh 'echo $PATH'
                sh 'ionic serve'
            }
        }
    }
}