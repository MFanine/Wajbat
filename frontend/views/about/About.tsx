import {
  HeaderTitle,
  RichTextParser,
  Services,
  TextToggle,
} from "Frontend/common/index.js";

export default function About() {
  return (
    <div>
      <div className="bg-[url('https://www.uber-assets.com/image/upload/v1588108634/assets/ca/e6987f-a0fb-49b4-9248-f093d5778cf3/original/How_Uber_Eats_Works_media-DESKTOP-TABLET-MOBILE-19x9.jpg')] bg-no-repeat bg-cover">
        <div className="container flex flex-col justify-center h-auto min-h-[40vw]">
          <HeaderTitle title="À propos de nous" className="w-fit" />
          <RichTextParser
            text="<h1><strong>Qui sommes-nous</strong></h1>
<p>Nous sommes un petit restaurant à Taounate. Nous offrons aux utilisateurs la possibilité de commander en ligne et sur place en utilisant nos tablettes. Nous proposons également la livraison de repas pour un petit coût.</p>"
            className="w-[40%] prose-h1:text-xxl prose-p:text-xl"
          />
        </div>
      </div>
      <div className="container py-12 flex flex-col items-center gap-12">
        <h1 className="text-main text-xxl font-bold">Ce que nous offrons</h1>
        <Services />
        <h1 id="terms" className="text-main text-xxl font-bold">
          Conditions d'utilisation
        </h1>
        <RichTextParser
          text={`
    <p>Bienvenue dans notre système de commande de nourriture ! Ces conditions d'utilisation (« Conditions ») définissent les termes et conditions qui régissent votre utilisation de notre plateforme et de nos services. En accédant ou en utilisant notre système, vous acceptez de respecter ces Conditions. Veuillez les lire attentivement avant de continuer.</p><h2>1. Acceptation des Conditions</h2><p>En accédant ou en utilisant notre système de commande de nourriture, vous reconnaissez avoir lu, compris et accepté d'être lié par ces Conditions. Si vous n'êtes pas d'accord avec une quelconque disposition de ces Conditions, veuillez ne pas utiliser notre système.</p><h2>2. Utilisation de la Plateforme</h2><p><strong>a. Éligibilité :</strong> Pour utiliser notre système de commande de nourriture, vous devez avoir au moins 18 ans ou avoir la capacité légale de conclure des contrats dans votre juridiction.<br><strong>b. Inscription au compte :</strong> Vous devrez peut-être créer un compte pour accéder à certaines fonctionnalités de notre système. Vous acceptez de fournir des informations précises et complètes lors du processus d'inscription et de garder vos identifiants de compte confidentiels. Vous êtes responsable de toutes les activités qui se produisent sous votre compte.</p><h2>3. Processus de Commande de Nourriture</h2><p><strong>a. Disponibilité et Exactitude :</strong> Notre plateforme propose une sélection d'articles alimentaires disponibles à la commande auprès des restaurants participants. Cependant, nous ne garantissons pas la disponibilité d'articles spécifiques, car ils dépendent de l'inventaire des restaurants respectifs. Nous nous efforçons de fournir des informations précises sur les éléments du menu, les prix et les descriptions, mais des erreurs peuvent survenir. Nous ne sommes pas responsables des inexactitudes ou des divergences dans les informations fournies.<br><strong>b. Commandes et Paiements :</strong> Passer une commande via notre système constitue une offre d'achat des articles alimentaires sélectionnés. L'acceptation de votre commande est soumise à la confirmation par le restaurant. Vous acceptez de fournir des informations de paiement valides et précises. Nous ne traitons pas les paiements directement et faisons appel à des processeurs de paiement tiers. Tout problème lié au paiement doit être résolu avec le processeur de paiement concerné.</p><h2>4. Partenaires Restaurateurs</h2><p><strong>a. Entrepreneurs Indépendants :</strong> Les restaurants répertoriés sur notre plateforme sont des entreprises indépendantes et ne sont pas détenus ou exploités par nous. Nous ne sommes pas responsables de leurs actions, produits ou services. Tout litige ou problème concernant la qualité des aliments, leur préparation ou leur livraison doit être adressé directement au restaurant.<br><strong>b. Exigences Diététiques Spéciales :</strong> Bien que nous nous efforcions de répondre aux exigences diététiques spéciales, il vous incombe d'informer le restaurant de toute allergie ou restriction alimentaire spécifique. Nous ne pouvons garantir l'absence d'allergènes ni l'exactitude des informations sur les allergènes fournies par les restaurants.</p>

    <h2>5. Propriété Intellectuelle</h2>
    <p>
        <strong>a. Propriété :</strong> Tous les droits de propriété intellectuelle dans notre système de commande de nourriture, y compris les logiciels, logos, marques déposées et contenus, nous appartiennent ou appartiennent à nos concédants de licence. Vous bénéficiez d'une licence limitée, non exclusive et non transférable pour utiliser le système dans le but prévu.<br>
        <strong>b. Restrictions :</strong> Vous ne pouvez pas modifier, distribuer, reproduire ou créer des œuvres dérivées basées sur notre système sans notre consentement écrit préalable.
    </p>

    <h2>6. Limitation de Responsabilité</h2>
    <p>
        <strong>a. Exclusion de Garanties :</strong> Notre système de commande de nourriture est fourni « tel quel » et « selon disponibilité ». Nous ne faisons aucune garantie ou représentation concernant l'exactitude, la fiabilité ou la disponibilité de notre système.<br>
        <strong>b. Limitation de Responsabilité :</strong> Dans la mesure maximale permise par la loi applicable, nous ne serons pas responsables des dommages indirects, accessoires, spéciaux, consécutifs ou punitifs, y compris, mais sans s'y limiter, la perte de profits, de données ou d'opportunités commerciales découlant de votre utilisation de notre système.
    </p>

    <h2>7. Droit Applicable et Résolution des Litiges</h2>
    <p>Ces Conditions seront régies et interprétées conformément aux lois de [Juridiction]. Tout litige découlant de ou lié à ces Conditions sera résolu par la négociation ou, si nécessaire, par un arbitrage contraignant conformément aux règles de [Institution d'Arbitrage].</p>

    <h2>8. Modifications</h2>
    <p>Nous nous réservons le droit de modifier ou de mettre à jour ces Conditions à tout moment sans préavis. La version la plus récente des Conditions sera publiée sur notre plateforme.</p>`}
          className="prose-h2:text-tertiary prose-h2:text-center prose-h2:font-bold prose-h2:text-xbase prose-p:text-base"
        />
        <h1 id="faq" className="text-main text-xxl font-bold">
          FAQ
        </h1>
        <div className="flex flex-col w-full">
          <TextToggle
            className=""
            isOpen
            question="1. Comment passer une commande ?"
            answer="<p>Pour passer une commande, suivez ces étapes :
        <ol>
            <li>Connectez-vous à votre compte ou créez un nouveau compte si vous n'en avez pas.</li>
            <li>Parcourez les restaurants disponibles et sélectionnez les articles souhaités dans leurs menus.</li>
            <li>Vérifiez votre commande et passez à la caisse.</li>
            <li>Fournissez les informations de livraison nécessaires et choisissez votre méthode de paiement préférée.</li>
            <li>Soumettez votre commande, et vous recevrez un e-mail de confirmation avec les détails.</li>
        </ol>
    </p>"
          />
          <TextToggle
            question="2. Puis-je modifier ou annuler ma commande ?"
            answer="<p>Une fois que vous avez soumis votre commande, elle est envoyée directement au restaurant pour préparation. Par conséquent, les modifications ou annulations peuvent ne pas être possibles, surtout si le restaurant a déjà commencé à travailler sur votre commande. Nous vous recommandons de contacter directement le restaurant pour vous renseigner sur les éventuelles modifications ou annulations.</p>"
          />
          <TextToggle
            question="3. Combien de temps prend la livraison ?"
            answer="Le temps de livraison dépend de divers facteurs, y compris la distance entre le restaurant et votre emplacement, les conditions de circulation et la charge de travail du restaurant. Lors de la commande, vous verrez généralement un temps de livraison estimé fourni par le restaurant. Cependant, veuillez noter que ce sont des estimations et qu'elles peuvent varier."
          />
          <TextToggle
            question="4. Y a-t-il des frais supplémentaires pour l'utilisation du système de commande de nourriture ?"
            answer="Nous ne facturons aucun frais supplémentaire pour l'utilisation de notre système de commande de nourriture. Cependant, veuillez noter que certains restaurants peuvent appliquer leurs propres frais de livraison ou exigences de commande minimum. Ces détails seront affichés lors du processus de commande."
          />
        </div>
      </div>
    </div>
  );
}