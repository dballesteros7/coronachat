from .schema import TopLevelMessage, TopLevelOption

DEFAULT_TOP_LEVEL_MESSAGE = TopLevelMessage(
    header_content="""\
Bienvenidos a la OMS

Obtenga información y orientación de la OMS sobre el brote de coronavirus COVID-19.

¿Qué le gustaría saber sobre coronavirus?

Escriba el número (o emoji) para acceder a la información sobre estos temas:
""",
    top_level_options=[
        TopLevelOption(
            title='Últimas cifras 🔢',
            content="""\
Últimas cifras 🔢

Novedoso panel de control de situación del coronavirus (COVID-19)
Este tablero / mapa interactivo proporciona los últimos números globales y números por país de casos COVID-19 a diario. 

https://experience.arcgis.com/experience/685d0ace521648f8a5beeeee1b9125cd
""",
            position=0
        ),
        TopLevelOption(
            title='Cómo protegerse 👍',
            content="""\
Acceda al video: https://youtu.be/8c_UJwLq8PI

Protéjase 

🧼 Lávese las manos con frecuencia

👄 Evite tocarse los ojos, la boca y la nariz

💪 Cúbrase la boca y la nariz con el codo doblado o con un pañuelo de papel al toser o estornudar

🚷 Evite lugares concurridos

🏠  Permanezca en casa si no se encuentra bien - incluso si tiene síntomas leves de fiebre y tos
""",
            position=1,
        )
    ]
)
