import { Template } from '../../model/model';

//TODO (MB) all its properties of this instance should be readonly
export const defaultTemplateEN: Template = {
  header: `*Welcome to Coronainfochat* 🇨🇴

  Official information about coronavirus in Bucaramanga.
  
  You can find more information about coronavirus provided by Instituto Nacional de Salud here: https://www.ins.gov.co/Noticias/Paginas/Coronavirus.aspx

  *What would you like to know about coronavirus?*
  
  Reply with a number at any time to get the latest information on the topic: 👇🏼`,
  menuItems: [
    {
      id: 1,
      title: 'What is coronavirus? 🦠',
      content: `*What is coronavirus?*

Coronavirus disease (COVID-19) is an infectious disease caused by a newly discovered coronavirus.

Most people infected with the COVID-19 virus will experience mild to moderate respiratory illness and recover without requiring special treatment.  Older people, and those with underlying medical problems like cardiovascular disease, diabetes, chronic respiratory disease, and cancer are more likely to develop serious illness.

The COVID-19 virus spreads primarily through droplets of saliva or discharge from the nose when an infected person coughs or sneezes, so it’s important that you also practice respiratory etiquette (for example, by coughing into a flexed elbow).
      `,
      footerItems: ['Reply 0 for Menu'],
    },
    {
      id: 2,
      title: 'How can I protect myself? 👏🧼',
      content: `*How can I protect myself?*
      
Watch the video: https://youtu.be/8c_UJwLq8PI

*Protect yourself*

🧼 Wash your hands frequently

👄 Avoid touching your eyes, mouth and nose

💪 Cover your mouth and nose with your bent elbow or tissue when you cough or sneeze

🚷 Avoid crowded places

🏠 Stay at home if you feel unwell - even with a slight fever and cough

🤒 If you have a fever, cough and difficulty breathing, seek medical care early - but call by phone first

ℹ️ Stay aware of the latest information


*Inspiration*

- Balcony concerts while social distancing https://twitter.com/_SJPeace_/status/1240133524813987842
- African artists are creating catchy songs to https://www.cnn.com/2020/03/17/africa/coronavirus-music-africa-intl/index.html
promote awareness about coronavirus
- Social Distancing - matches https://twitter.com/JoshuaPotash/status/1239255917943820289
- Coronavirus: Indian greeting namaste goes global https://www.bbc.com/news/av/world-asia-india-51854798/coronavirus-indian-greeting-namaste-goes-global
- HOMEcoming Rewatch Party https://twitter.com/i/events/1240407094651539458
- Together, At Home concert series https://www.instagram.com/tv/B920EARl9XS/
- WHO explainer https://www.youtube.com/watch?v=6Ooz1GZsQ70&feature=emb_title
      
      `,
      footerItems: ['Reply 0 for Menu'],
    },
    {
      id: 3,
      title: 'Myth-busters 🛑',
      content: `*WHO Myth-busters*

There is a lot of false information around. These are the facts.

🔢 People of all ages CAN be infected by the coronavirus. Older people, and people with pre-existing medical conditions (such as asthma, diabetes, heart disease) appear to be more vulnerable to becoming severely ill with the virus. 

❄️ Cold weather and snow CANNOT kill the coronavirus.

☀️ The coronavirus CAN be transmitted in areas with hot and humid climates

🦟 The coronavirus CANNOT be transmitted through mosquito bites.

🐶 There is NO evidence that companion animals/pets such as dogs or cats can transmit the coronavirus.

🛀 Taking a hot bath DOES NOT prevent the coronavirus

💨 Hand dryers are NOT effective in killing the coronavirus

🟣 Ultraviolet light SHOULD NOT be used for sterilization and can cause skin irritation

🌡️ Thermal scanners CAN detect if people have a fever but CANNOT detect whether or not someone has the coronavirus

💦 Spraying alcohol or chlorine all over your body WILL NOT kill viruses that have already entered your body

💉 Vaccines against pneumonia, such as pneumococcal vaccine and Haemophilus influenzae type b (Hib) vaccine, DO NOT provide protection against the coronavirus.

👃 There is NO evidence that regularly rinsing the nose with saline has protected people from infection with the coronavirus. 

🧄 Garlic is healthy but there is NO evidence from the current outbreak that eating garlic has protected people from the coronavirus.

💊 Antibiotics DO NOT work against viruses, antibiotics only work against bacteria.

🧪 To date, there is NO specific medicine recommended to prevent or treat the coronavirus.

Check the facts on the WHO website: https://www.who.int/emergencies/diseases/novel-coronavirus-2019/advice-for-public/myth-busters`,
      footerItems: ['Reply 0 for Menu'],
    },
    {
      id: 4,
      title: 'I think I am infected 🤒',
      content: `*I think I am infected*

If you have fever, cough and difficulty breathing, seek
medical care early. Stay home if you feel unwell. If you
have a fever, cough and difficulty breathing, seek
medical attention and call in advance. Follow the
directions of your local health authority.

Call your *local authorities*: 
- +57(1) 330 5041 (in Bogotá) 
- 018000955590 or 192 (in the rest of the country)

*Why?* National and local authorities will have the most
up to date information on the situation in your area.
Calling in advance will allow your health care provider to
quickly direct you to the right health facility and
protocols in place. This will also protect you and help
prevent spread of viruses and other infections.

NB: This advice is current as of 18 March.
      `,
      footerItems: ['Reply 0 for Menu'],
    },
    {
      id: 4,
      title: 'What are the containment measures implemented in Bucaramanga? ⚖️',
      content: `*What are the containment measures implemented in Bucaramanga?*

The mayor of Bucaramanga declared a state of public calamity in the city and announced new preventive measures against the coronavirus:

      `,
      footerItems: ['Reply 0 for Menu'],
    },
    {
      id: 5,
      title: 'Latest numbers 📊',
      content: `*Latest numbers*

The last report from the Ministry of Health confirmed that XXXXX are infected, XXXXX died, and XXXXX recovered.

XXXX people are positive in Bucaramanga.`,
      footerItems: ['Reply 0 for Menu'],
    },
    {
      id: 6,
      title: 'I feel lonely or worried 😔',
      content: `*I feel lonely or worried*

If you experience anxiety due to the isolation, you feel worried about your financial situation or stressed by the fear of getting infected by COVID-19:
several international organizations, governments, and foundations offers psychologic aid via helplines, chat de WhatsApp, virtual calls, and email.
      
These are some of the services available in Colombia:

*Cruz Roja Colombiana, seccional Norte de Santander*

WhatsApp chat (psychological support): +57 310-2865684
WhatsApp chat (medical support): +57 320-2462582
https://www.cruzrojands.org/ 


*Comitato Internazionale per lo Sviluppo dei Popoli – CISP*

Contacts (WhatsApp, MSM or call): +57 314-2410425 / +57 310-6426055 / +57 322-8969229 / +57 317-6583519
https://www.developmentofpeoples.org

This service is active from 9am to 5pm every day.
      `,
      footerItems: ['Reply 0 for Menu'],
    },
  ],
};
