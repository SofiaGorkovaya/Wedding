document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('guests-form');
  let isSubmitting = false; // 🛡 защита от двойной отправки

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    if (isSubmitting) return; // 🔁 предотвращаем повтор

    const name = form.elements['name'].value.trim();
    const companion = form.elements['plus_one'].value.trim();
    const attendance = form.elements['review'].value;
    const preferences = [...form.querySelectorAll('input[name="preferences"]:checked')].map(cb => cb.value);

    // === ВАЛИДАЦИЯ ===
    if (!name) {
      alert('Пожалуйста, укажите имя.');
      return;
    }

    if (!attendance) {
      alert('Пожалуйста, выберите, будете ли вы присутствовать.');
      return;
    }

    if (attendance === 'С удовольствием приду!' && preferences.length === 0) {
      alert('Пожалуйста, выберите хотя бы одно предпочтение.');
      return;
    }

    const payload = {
      name,
      companion,
      attendance,
      preferences
    };

    isSubmitting = true; // 🔒 блокируем повтор

    try {
      const response = await fetch('https://script.google.com/macros/s/AKfycbzTcJ4jDskL_n8Va_BZCPx4GMyeOuwzLehxswLr82GcBY6VntR8SH6_JjAgiJQzQ42M/exec', {
        method: 'POST',
        mode: 'no-cors', // ✅ чтобы не было CORS-блокировки
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      // Google Apps Script с no-cors не вернёт результат — считаем отправленным
      alert('Спасибо! Данные успешно отправлены.');
      form.reset();
    } catch (error) {
      console.error(error);
      alert('Ошибка соединения. Попробуйте позже.');
    } finally {
      isSubmitting = false; // 🔓 разблокировка
    }
  });
});
