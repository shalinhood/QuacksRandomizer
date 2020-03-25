pipeline {
	agent {
		docker {
			image 'node:12-alpine'
			args '-p 3000:3000'
		}
	}
	stages {
		stage('Git') {
			steps {
				checkout([
					$class: "GitSCM",
					branches: [[name: "master"]],
					browser: [$class: "GitHub", repoUrl: "https://github.com/shalinhood/QuacksRandomizer.git"],
					userRemoteConfigs: [[
						credentialsId: "shalinhood",
						url: "git@github.com:shalinhood/QuacksRandomizer.git"
					]]
				])
			}
		}
		stage('Build') {
			steps {
				sh 'npm install'
				sh 'npm run pack-p'
			}
		}
		stage('Deploy') {
			steps {
				sh 'firebase deploy'
			}
		}
	}
}
