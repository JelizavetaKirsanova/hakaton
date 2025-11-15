export async function sendNotification(manager: any, lead: any) {
    console.log(`Отправляем уведомление менеджеру ${manager.name} о новом лиде ${lead.name}`);
    // Здесь можно подключить SendGrid, Slack, Telegram и т.д.
  }

  