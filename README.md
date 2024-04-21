# AidEra: Your Neighborly Helping Hand

## Inspiration
In today's fast-paced world, the elderly often find themselves isolated, struggling to perform everyday tasks that many of us take for granted. At the same time, many younger individuals are eager to contribute to their communities but don't know where their help is most needed. Recognizing this gap, we were inspired to create AidEra—a platform designed to connect these two groups. AidEra empowers older adults to seek assistance with daily tasks, while providing a meaningful way for younger volunteers to engage and make a tangible difference. This project not only addresses the practical needs of the elderly but also fosters intergenerational relationships and community solidarity.

## What it does
AidEra is designed to empower the elderly and bring communities together through three innovative features:

### 1. Community Tab
This is a dynamic space where the elderly can openly post about their needs and requirements, ranging from day-to-day tasks to more complex requests. These posts are visible to nearby volunteers who can offer their services in various categories such as:
- **Food Delivery**
- **Transportation**
- **House Maintenance**
- **Cleaning Services**
- **Personal Assistance**
- **Tech Support**
- **Companionship/Social Visits**
- **Medical Assistance**
- **Errand Running**
- **Exercise & Wellness Activities**

### 2. Chat Interface
AidEra's chat interface acts as a 24/7 AI companion that not only engages users in conversation but also helps manage their daily activities. Key features include:
- **Medicine Reminders**: Timely reminders for taking medications.
- **Appointment Alerts**: Reminders for upcoming appointments to ensure they're never missed.
- **User-Friendly Interaction**: Designed to be easy for elderly users to navigate and use.

### 3. Sort Your Emails
This feature enhances the way elderly users interact with their emails by:
- **Sorting and Prioritizing**: Automatically sorting emails by urgency and importance.
- **Setting Reminders and Appointments**: Integrating with the chat interface to set reminders directly from email prompts to ensure important dates and tasks are not overlooked.

AidEra is not just a platform but a community builder that enhances the lives of the elderly by connecting them with the vibrant energy of younger volunteers.

## How We Built It

### Frontend

For the user interface, our approach combined modern technologies and frameworks to ensure a responsive and intuitive design:

- **React**: A JavaScript library used for building dynamic user interfaces.
- **Next.js**: A framework for React that simplifies the creation of scalable and fast web applications.
- **JavaScript**: The scripting language that enables interactive web pages.
- **TypeScript**: A strongly typed superset of JavaScript that adds type safety and enhances code quality and maintainability.
- **HTML**: The standard markup language used to create and structure web pages.
- **CSS**: The styling language that defines the look and layout of web content.
- **Tailwind CSS**: A utility-first CSS framework designed for rapid UI development without leaving your HTML.

### Backend

We structured the server-side operations to be robust and efficient using:

- **FastAPI**: A modern, fast web framework for building APIs with Python that comes with automatic data validation and interactive API documentation.
- **Python**: A versatile programming language that we utilized for its simplicity and powerful ecosystem in web development.

### Integrations

To enhance the functionality and intelligence of our application, we integrated cutting-edge technologies:

- **Fetch.ai**: Leveraged their AI capabilities to facilitate the assembly of autonomous task services within the platform.
- **Gemini**: Used for powering the chat interface and understanding task priority by analyzing and sorting emails for elderly users.

## Challenges We Ran Into

Developing AidEra was an ambitious project, and we faced several significant challenges along the way. These hurdles tested our skills and pushed us to innovate solutions:

1. **Customized JSON Output**: One of the more technical challenges was designing a system that could generate customized JSON outputs for event creation based directly on the email content. Achieving this required precise data parsing and manipulation to ensure accuracy and relevancy.

2. **Integration of Fetch.ai Agents with Proxy**: Integrating the Fetch.ai agents through a proxy for secure and effective communication presented technical difficulties. This step was crucial for maintaining operational integrity but required extensive troubleshooting to establish stable connections.

3. **Task Definition for Agents and Services**: Defining specific tasks for our agents and services involved detailed planning and execution. Each task had to be carefully crafted to allow the agents to perform efficiently and reliably within the platform's ecosystem.

4. **Google Calendar Integration**: Integrating with Google Calendar and creating its agent using the Google Calendar Simple API (GCSA) was challenging. We aimed to enable the creation of new events and reminders directly from the application, which required deep integration and testing to ensure reliability and user-friendliness.

Each of these challenges brought learning opportunities and helped us refine our approach, contributing to the robustness and functionality of AidEra.


## Accomplishments that We're Proud Of

We are particularly proud of several key achievements in the development of AidEra, which demonstrate our commitment to innovation and user-centric design:

1. **Google Calendar Agent with Fetch.ai**: Successfully created a Google Calendar Agent using Fetch.ai's autonomous agent technology. This agent intelligently sets up reminders, events, and appointments directly from the app, enhancing our users' ability to manage their schedules efficiently.

2. **Email Integration with Gemini**: Integrated Gemini's advanced capabilities to read and analyze email content. This feature helps in determining the priority of each email, ensuring that important messages are promptly addressed, which is especially beneficial for elderly users who may find email management overwhelming.

3. **Creation of Email Priority Agent**: Developed a dedicated Email Priority Agent that categorizes emails by their level of urgency. This allows our users to focus on the most critical communications first, streamlining their interaction with digital correspondence.

4. **Prompt Engineering for Email Priority Agent**: Applied advanced prompt engineering techniques to refine the functionality of the Email Priority Agent. This has significantly improved the agent's ability to interpret and prioritize email content accurately, making the tool more effective and responsive to the needs of our users.

## Future Enhancements

As we look to the future of AidEra, we are excited about the potential to expand and enhance our platform with several key improvements:

1. **Rescheduling Appointments and Reminders**: We plan to implement a feature that automatically detects event clashes and offers intelligent rescheduling options for appointments and reminders. This will ensure that users can manage their calendars more efficiently without the risk of overlapping events.

2. **Emergency Notifications for Volunteers**: To enhance the safety and well-being of the elderly, we aim to introduce a system that notifies volunteers within the closest mile radius during emergency or SOS situations. This will help ensure that urgent needs are promptly met by nearby helpers.

3. **AI to Human Chat Handovers**: Another enhancement will be the development of a seamless handover process from our AI chat interface to human volunteers. This will allow for a smoother transition when users need more personalized assistance or when complex issues arise that require human intervention.

These enhancements are designed to improve user experience and provide even more robust support for the elderly and volunteers within the AidEra community.
