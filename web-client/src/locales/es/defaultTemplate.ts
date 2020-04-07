import { Template } from '../../model/model';

//TODO (MB) all its properties of this instance should be readonly
export const defaultTemplateES: Template = {
  header: `*Bienvenido a Coronainfochat* 🇨🇴

Información oficial sobre el coronavirus en Bucaramanga.

Para conocer más información oficial sobre el coronavirus, accede a la página web del Instituto Nacional de Salud: https://www.ins.gov.co

*¿Qué te gustaría saber sobre el coronavirus?*

Para interactuar conmigo, escribe 1, 2, 3, 4, 5, 6, o 7 y resolveré tus dudas 👇🏼`,
  menuItems: [
    {
      id: 1,
      title: '¿Qué es el coronavirus? 🦠',
      content: `*¿Qué es el coronavirus?*
      
Comúnmente se le llama “coronavirus” a la enfermedad COVID-19, pero son cosas diferentes. 
El coronavirus es un tipo de virus que puede infectar a las personas y causar enfermedades. Se conocen siete coronavirus que afectan a los humanos y once que afectan a los animales.

El COVID-19 es una enfermedad causada por un nuevo coronavirus llamado SARS-CoV-2. Actualmente estamos viviendo una pandemia de COVID-19 porque hay muchas personas contagiadas en casi todos los países del mundo.

La enfermedad COVID-19 puede generar tos, fiebre, fatiga, pérdida del gusto y del olfato. En la mayoría de los casos los síntomas son leves, pero a algunas personas llega a causarles otros más graves, como neumonía y choque séptico.
      `,
      footerItems: ['Escriba 0 para ir al Menú'],
    },
    {
      id: 2,
      title: '¿De dónde salió el coronavirus? 🚪',
      content: `*¿De dónde salió el coronavirus?*
      
Los virus se encuentran en todo el planeta y al igual que los seres vivos, pasan por ciclos en el que se crean, desarrollan o mutan. Los coronavirus son un grupo de virus que se encuentran en la naturaleza y atacan aves y mamíferos (en total se han descubierto dieciocho diferentes).

En el caso del COVID-19 aún no existe certeza de su origen exacto pero la Organización Mundial de Salud considera posible que esté relacionado con el contacto de seres humanos con murciélagos o con otros animales que hayan estado en contacto con murciélagos.

Los primeros casos de COVID-19 se detectaron en la región de Wuhan, China a finales de 2019. Desde allí se empezó a contagiar a otros países a medida que personas infectadas hacían viajes internacionales.`,
      footerItems: ['Escriba 0 para ir al Menú'],
    },
    {
      id: 3,
      title: '¿Cuál es el último reporte de casos en Colombia? 📊',
      content: `*¿Cuál es el último reporte de casos en Colombia?*
      
El último reporte del Ministerio de Salud confirmó XXXXX personas infectadas, de las cuales XXXXX han fallecido y XXXXX ya se recuperaron.

En Bucaramanga tenemos XXXX casos confirmados.`,
      footerItems: ['Escriba 0 para ir al Menú'],
    },
    {
      id: 4,
      title: 'Cómo prevengo el coronavirus? 👏🧼',
      content: `*Cómo prevengo el coronavirus?*
      
Para prevenir el contagio de COVID-19, lo más efectivo es:

-	Mantente alejado de los lugares concurridos y procura no salir de tu casa para cosas que no sean indispensables. 
-	Evita saludar con apretón de manos.
-	Lávate las manos con agua y jabón durante por lo menos 20 segundos, varias veces al día.
-	Lávate las manos cada vez que vuelvas a tu casa.
-	Evita tocarte la cara.
-	Limpia y desinfecta las superficies y objetos de uso frecuente (como manijas y pasamanos).
-       *Siempre acata las órdenes del gobierno nacional en relación con el aislamiento obligatorio.*

Además, recuerda que muchas personas infectadas con el coronavirus no presentan ningún síntoma. Por eso es importante evitar el contacto con todas las personas ajenas a tu casa, no solamente aquellas que se ven enfermas.

      `,
      footerItems: ['Escriba 0 para ir al Menú'],
    },
    {
      id: 5,
      title: '¿El coronavirus tiene cura? 👩‍⚕️',
      content: `¿El coronavirus tiene cura?
      
Actualmente no existe ninguna cura contra el COVID-19. Tampoco hay prueba de medicamentos o remedios que sirvan para prevenirlo. Sin embargo, hay varios países y compañías realizando pruebas de laboratorios. 

A través de este medio te estaremos brindando información actualizada tan pronto se descubran curas o nuevas formas de prevenirlo.`,
      footerItems: ['Escriba 0 para ir al Menú'],
    },
    {
      id: 6,
      title: 'Me enteré de un remedio casero para prevenir el coronavirus, ¿es cierto? 🤔',
      content: `*Me enteré de un remedio casero para prevenir el coronavirus, ¿es cierto?*

No. No es cierto. En la actualidad no existe ningún remedio casero, vacuna o medicamento para curar o prevenir el COVID-19.

La mejor forma de protegerte a ti mismo y a quienes te rodean es respetando las medidas de distanciamiento social, lavándote las manos frecuentemente y tapándote la boca al momento de toser o estornudar.
      `,
      footerItems: ['Escriba 0 para ir al Menú'],
    },
    {
      id: 7,
      title: '¿Qué hago si creo que estoy contagiado? 🤒',
      content: `*¿Qué hago si creo que estoy contagiado?*

Llama al +57(1) 330 5041 (en Bogotá) o el 018000955590 (en el resto del país) o marca al 192 desde su celular.

Intenta tener contacto con el menor número de personas posible. Si tienes tos o estornudos, tápate la boca con un pañuelo o el interior del codo y lávate las manos constantemente.`,
      footerItems: ['Escriba 0 para ir al Menú'],
    },
  ],
};
