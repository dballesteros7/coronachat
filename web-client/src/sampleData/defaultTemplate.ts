import { Template } from "../model/model";

//TODO (MB) all its properties of this instance should be readonly
export const defaultTemplate: Template = {
  header: `Bienvenidos a la OMS

    Obtenga información y orientación de la OMS sobre el brote de coronavirus COVID-19.
    
    ¿Qué le gustaría saber sobre coronavirus?
    
    Escriba el número (o emoji) para acceder a la información sobre estos temas:`,
  menuItems: [
    {
      index: 1,
      title: 'Últimas cifras',
      content: `Últimas cifras 🔢

      Novedoso panel de control de situación del coronavirus (COVID-19)
      Este tablero / mapa interactivo proporciona los últimos números globales y números por país de casos COVID-19 a diario. 
      https://experience.arcgis.com/experience/685d0ace521648f8a5beeeee1b9125cd
      
      Distribución geográfica de la enfermedad por el coronavirus 2019-nCoV en las Américas
      https://who.maps.arcgis.com/apps/webappviewer/index.html?id=2203b04c3a5f486685a15482a0d97a87&extent=-17277700.8881%2C-1043174.5225%2C-1770156.5897%2C6979655.9663%2C102100
      
      Para cifras por país, visite los últimos informes aquí: 
      https://www.who.int/emergencies/diseases/novel-coronavirus-2019/situation-reports/`,
      footerItems: [
        'Escriba 0 para ir al Menú'
      ]
    },
    {
      index: 2,
      title: 'Cómo protegerse',
      content: `Acceda al video: https://youtu.be/8c_UJwLq8PI

      Protéjase 
      
      🧼 Lávese las manos con frecuencia
      
      👄 Evite tocarse los ojos, la boca y la nariz
      
      💪 Cúbrase la boca y la nariz con el codo doblado o con un pañuelo de papel al toser o estornudar
      
      🚷 Evite lugares concurridos
      
      🏠  Permanezca en casa si no se encuentra bien - incluso si tiene síntomas leves de fiebre y tos
      
      🤒 Si tiene fiebre, tos o difficultades respiratorias, busque atención médica cuanto antes - pero llame por teléfono primero
      
      ℹ️ Permanezca informado de la última información de la OMS 
      
      ⏩ Comparta este servicio con este link: https://wa.me/41225017690?text=hola`,
      footerItems: [
        'Escriba 0 para ir al Menú'
      ]
    },
    {
      index: 3,
      title: 'Preguntas frecuentes',
      content: `
      Resuelva sus preguntas❓

      Escriba el número para acceder a la respuesta:

      10. ¿Qué es un coronavirus?

      11. ¿Cuáles son los síntomas del COVID-19?

      12. ¿Cómo se propaga el COVID-19?

      13. ¿Es posible contagiarse de COVID-19 por contacto con heces, animales o mascotas?

      14. ¿Es posible contagiarse de COVID-19 por contacto con superficies infectadas o paquetes provenientes de un area infectada?

      15. ¿Qué puedo hacer para protegerme y prevenir la propagación de la enfermedad?
      16. ¿Qué debo hacer si he visitado un área donde COVID-19 se está propagando?

      17. ¿Qué tratamientos hay disponibles para el COVID-19 (incluyendo medicamentos, vacunas, terapias)?

      18. ¿Debo llevar mascarilla para protegerme?

      19. ¿Hay algo que deba evitar?

      20. ¿Cómo puedo gestionar el estrés durante el COVID-19?

      21. ¿Cómo puedo ayudar a los niños a gestionar su estrés durante el COVID-19?
`,
      footerItems: [
        'Escriba 0 para ir al Menú'
      ]
    }
  ]
}