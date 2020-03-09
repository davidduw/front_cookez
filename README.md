<h1>Mise en place du front</h1>
-Installer NodeJS<br>
-Lancer la commande "npm install -g cordova"<br>
-Lancer la commande "npm install -g ionic"<br>
-Lancer la commande "npm install -g node-sass"<br>

-Pour lancer le projet -> "ionic serve"

<hr>

<h1>Pour faire un docker front</h1>

Build l'image:
docker build -t ionic_cookez .

Pour créer l'image (Attention à bien spécifier le port)
docker run -p 8100:8100 -it ionic_cookez
