export default function ErrorPage () {
    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold mb-4">Oups ! Page non trouvée</h1>
            <p>
                Désolé, la page que vous recherchez n'existe pas ou a été déplacée.
                Veuillez vérifier l'URL ou revenir à la page d'accueil.
            </p>
        </div>
    );
}
