import { ReadOnlyTemplate } from '../../model/model';

export const defaultTemplateIT: ReadOnlyTemplate = {
  header: `*Benvenuto nella Coronainfochat* 🇮🇹

Informazioni ufficiali riguardo al coronavirus del Comune di Ponzuno.

Per maggiori informazioni sul coronavirus, visita la pagina web del Ministero della Salute: http://www.salute.gov.it/nuovocoronavirus

*Rimani a casa ed esci solo se strettamente necessario.*

Cosa vorresti sapere della situazione coronavirus?

Per interagire con me, scrivi 1, 2, 3, 4, 5, 6, 7, 8, 9 o 10 e risolverò i tuoi dubbi 👇🏼`,
  menuItems: [
    {
      id: 1,
      title: `Cos'è il coronavirus? 🦠`,
      content: `*Che cos'è un Coronavirus?* 
I Coronavirus sono una vasta famiglia di virus noti per causare malattie che vanno dal comune raffreddore a malattie più gravi come la Sindrome respiratoria mediorientale (MERS) e la Sindrome respiratoria acuta grave (SARS).

*Che cos'è un nuovo Coronavirus?*
Un nuovo Coronavirus (nCoV) è un nuovo ceppo di coronavirus che non è stato precedentemente mai identificato nell'uomo. In particolare quello denominato SARS-CoV-2 (precedentemente 2019-nCoV), non è mai stato identificato prima di essere segnalato a Wuhan, Cina, a dicembre 2019.

*Il nuovo Coronavirus è lo stesso della SARS?*
No. il nuovo Coronavirus (ora denominato SARS-CoV-2 e già denominato 2019-nCoV) appartiene alla stessa famiglia di virus della Sindrome Respiratoria Acuta Grave (SARS) ma non è lo stesso virus.
Il nuovo Coronavirus, responsabile della malattia respiratoria ora denominata COVID-19, è strettamente correlato al SARS-CoV e si classifica geneticamente all'interno del sottogenere Betacoronavirus Sarbecovirus.

Per maggiori informazioni, visita la pagina http://www.salute.gov.it/portale/nuovocoronavirus/dettaglioFaqNuovoCoronavirus.jsp?lingua=italiano&id=228#1
      `,
      footerItems: ['Scrivi 0 per tornare al menù'],
    },
    {
      id: 2,
      title: 'Come posso prevenire il coronavirus? 👏🧼',
      content: `*Come posso prevenire il coronavirus?*

Mantieniti informato sulla diffusione della pandemia sui siti dell'OMS https://www.who.int/emergencies/diseases/novel-coronavirus-2019/situation-reports/ e del ministero http://www.salute.gov.it/nuovocoronavirus e adotta le seguenti misure di protezione personale:

- restare a casa, uscire di casa solo per esigenze lavorative, motivi di salute e necessità (vedi misure di contenimento)
- lavarsi spesso le mani;
- evitare il contatto ravvicinato con persone che soffrono di infezioni respiratorie acute;
- evitare abbracci e strette di mano;
- mantenimento, nei contatti sociali, di una distanza interpersonale di almeno un metro;
- igiene respiratoria (starnutire e/o tossire in un fazzoletto evitando il contatto delle mani con le secrezioni respiratorie);
- evitare l’uso promiscuo di bottiglie e bicchieri;
- non toccarsi occhi, naso e bocca con le mani;
- coprirsi bocca e naso se si starnutisce o tossisce;
- non prendere farmaci antivirali e antibiotici, a meno che siano prescritti dal medico;
- pulire le superfici con disinfettanti a base di cloro o alcol;
- usare la mascherina solo se si sospetta di essere malati o se si presta assistenza a persone malate. 
      `,
      footerItems: ['Scrivi 0 per tornare al menù'],
    },
    {
      id: 3,
      title: 'Cura e vaccini 👩‍⚕️',
      content: `*Esiste un trattamento per un nuovo Coronavirus?*
Non esiste un trattamento specifico per la malattia causata da un nuovo coronavirus. Il trattamento deve essere basato sui sintomi del paziente. La terapia di supporto può essere molto efficace. Terapie specifiche sono in fase di studio.

*Gli antibiotici possono essere utili per prevenire l’infezione da nuovo Coronavirus?*
No, gli antibiotici non sono efficaci contro i virus, ma funzionano solo contro le infezioni batteriche.

*La terapia anti-ipertensiva con ACE inibitori o sartani o quella con anti infiammatori non steroidei (es. ibuprofene) peggiora la malattia COVID-19?*
Non esistono evidenze scientifiche che stabiliscano una correlazione tra l’impiego d'ibuprofene o farmaci anti-ipertensivi e il peggioramento del decorso della malattia da COVID-19. Pertanto, in base alle conoscenze attuali, si raccomanda di non modificare le terapie in atto.`,
      footerItems: ['Scrivi 0 per tornare al menù'],
    },
    {
      id: 4,
      title: 'Devo indossare una mascherina per proteggermi? 😷⚔️',
      content: `*Devo indossare una mascherina per proteggermi?*

L’Organizzazione Mondiale della Sanità raccomanda di indossare una mascherina solo se sospetti di aver contratto il nuovo Coronavirus e presenti sintomi quali tosse o starnuti o se ti prendi cura di una persona con sospetta infezione da nuovo Coronavirus.

L’uso della mascherina aiuta a limitare la diffusione del virus ma deve essere adottata in aggiunta ad altre misure di igiene respiratoria e delle mani.

Infatti, è possibile che l'uso delle mascherine possa addirittura aumentare il rischio di infezione a causa di un falso senso di sicurezza e di un maggiore contatto tra mani, bocca e occhi.

Non è utile indossare più mascherine sovrapposte. L'uso razionale delle mascherine è importante per evitare inutili sprechi di risorse preziose.
Non è consigliato l’uso di maschere fatte in casa o di stoffa (ad esempio sciarpe, bandane, maschere di garza o di cotone), queste infatti non sono dispositivi di protezione e la loro capacità protettiva non è nota.


*Come devo mettere e togliere la mascherina?*

Ecco come fare:

- prima di indossare la mascherina, lavati le mani con acqua e sapone o con una soluzione alcolica
- copri bocca e naso con la mascherina assicurandoti che sia integra e che aderisca bene al volto
- evita di toccare la mascherina mentre la indossi, se la tocchi, lavati le mani
- quando diventa umida, sostituiscila con una nuova e non riutilizzarla; in quanto maschere mono-uso
- togli la mascherina prendendola dall’elastico e non toccare la parte anteriore della mascherina; gettala immediatamente in un sacchetto chiuso e lavati le mani.`,
      footerItems: ['Scrivi 0 per tornare al menù'],
    },
    {
      id: 5,
      title: 'Quali sono i sintomi 🤒',
      content: `*Quali sono i sintomi*
      
I sintomi più comuni di sono febbre, stanchezza e tosse secca. Alcuni pazienti possono presentare indolenzimento e dolori muscolari, congestione nasale, naso che cola, mal di gola o diarrea. Questi sintomi sono generalmente lievi e iniziano gradualmente. Nei casi più gravi, l'infezione può causare polmonite, sindrome respiratoria acuta grave, insufficienza renale e persino la morte.`,
      footerItems: ['Scrivi 0 per tornare al menù'],
    },
    {
      id: 6,
      title: 'Numeri utili ☎️',
      content: `*Informazioni generali e misure di contenimento*
- numero di pubblica utilità a _livello nazionale_: *1500*
- numero verde regione _Emilia Romagna_: 800 033 033

*In caso di sintomi*:
Chiama al telefono il tuo medico di famiglia, il tuo pediatra o la guardia medica. Oppure chiama il numero verde regionale.

Contattare il 112 oppure il 118 *soltanto se strettamente necessario*.`,
      footerItems: ['Scrivi 0 per tornare al menù'],
    },
    {
      id: 7,
      title: 'Ultime cifre 📊',
      content: `*Nel Comune di Ponzuno:*

L'ultimo report della Protezione Civile conferma che al momento sono XXXX le persone che risultano positive al virus.

Le persone guarite sono XXXX.

I pazienti ricoverati con sintomi sono XXXX, in terapia intensiva XXXX, mentre XXXX si trovano in isolamento domiciliare.

I deceduti sono XXXX, questo numero, però, potrà essere confermato solo dopo che l’Istituto Superiore di Sanità avrà stabilito la causa effettiva del decesso.

*Nel territorio nazionale:*

L'ultimo report della Protezione Civile conferma che al momento sono XXXX le persone che risultano positive al virus.

Le persone guarite sono XXXX.

I pazienti ricoverati con sintomi sono XXXX, in terapia intensiva XXXX, mentre XXXX si trovano in isolamento domiciliare.

I deceduti sono XXXX, questo numero, però, potrà essere confermato solo dopo che l’Istituto Superiore di Sanità avrà stabilito la causa effettiva del decesso.
      `,
      footerItems: ['Scrivi 0 per tornare al menù'],
    },
    {
      id: 8,
      title: 'Cosa faccio se credo di essere stato contagiato? 🤒',
      content: `*Cosa faccio se credo di essere stato contagiato?*

In caso di sintomi o dubbi, rimani in casa, non recarti al pronto soccorso o presso gli studi medici ma chiama al telefono il tuo medico di famiglia, il tuo pediatra o la guardia medica. Oppure chiama il numero verde regionale.

Scrivi 6 per vedere i numeri utili
      `,
      footerItems: ['Scrivi 0 per tornare al menù'],
    },
    {
      id: 9,
      title: 'Mi sento solo o molto preoccupato 😔',
      content: `*Mi sento solo o molto preoccupato*

Il Comune di Ponzuno mette a disposizione alcuni psicologi che ricevono tutti i giorni dalle ore 09 alle ore 18. Chiama il numero XXXX per prenotare un appuntamento.

Ci sono anche volontari che sono felici di ricevere la tua chiamata. Ti terranno compagnia al telefono e manterrai l'anonimato. Per parlare con uno di loro chiama il numero XXXX.
      `,
      footerItems: ['Scrivi 0 per tornare al menù'],
    },
    {
      id: 10,
      title: 'Dove e quando fare la spesa 🛒',
      content: `*Dove e quando fare la spesa*

Nel Comune di Ponzuno tutti gli alimentari e supermercati sono in servizio ma con orario limitato: sono aperti dal lunedì al sabato, dalle ore 7 alle ore 19.30.

Se hai compiuto 65 anni, avrai accesso prioritario e riservato al supermercato XXXX tra le ore 7 e le ore 9 tutti i giorni.
      `,
      footerItems: ['Scrivi 0 per tornare al menù'],
    },
  ],
};
