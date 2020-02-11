pipeline {
    agent any

    tools {nodejs "node"}
    
    environment {
        PATH='/usr/local/bin:/usr/bin:/bin'
    }

    stages {
        stage('Setup'){
            steps {
                pwsh 'npm install'
                pwsh 'npm rebuild node-sass'
            }
        }

        stage('Build'){
            steps {
                pwsh 'ionic serve'
            }
        }
    }
}