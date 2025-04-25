document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('guests-form');
  const submitButton = form.querySelector('button[type="submit"]');
  let isSubmitting = false; // флаг для предотвращения повторных отправок

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    if (isSubmitting) return; // если уже идет отправка, ничего не делать
    isSubmitting = true; // ставим флаг, чтобы предотвратить повторную отправку

    submitButton.disabled = true; // деактивируем кнопку

    const name = form.elements['name'].value.trim();
    const companion = form.elements['plus_one'].value.trim();
    const attendance = form.elements['review'].value;
    const preferences = [...form.querySelectorAll('input[name="preferences"]:checked')].map(cb => cb.value);

    // === ВАЛИДАЦИЯ ===

    if (!name) {
      alert('Пожалуйста, укажите имя.');
      isSubmitting = false;
      submitButton.disabled = false;
      return;
    }

    if (!attendance) {
      alert('Пожалуйста, выберите, будете ли вы присутствовать.');
      isSubmitting = false;
      submitButton.disabled = false;
      return;
    }

    if (attendance === 'С удовольствием приду!' && preferences.length === 0) {
      alert('Пожалуйста, выберите хотя бы одно предпочтение.');
      isSubmitting = false;
      submitButton.disabled = false;
      return;
    }

    // === ПОДГОТОВКА ДАННЫХ ===

    const payload = {
      name,
      companion,
      attendance,
      preferences
    };

    try {
      const response = await fetch('https://script.google.com/macros/s/AKfycbzTcJ4jDskL_n8Va_BZCPx4GMyeOuwzLehxswLr82GcBY6VntR8SH6_JjAgiJQzQ42M/exec', {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: {
          'Content-Type': 'application/json'
        }
      });

      const result = await response.json();

      if (result.result === 'success') {
        alert('Спасибо! Данные успешно отправлены.');
        form.reset();
      } else {
        alert('Ошибка при отправке данных. Попробуйте позже.');
      }

    } catch (error) {
      console.error(error);
      alert('Ошибка соединения. Проверьте интернет или попробуйте снова.');
    } finally {
      isSubmitting = false; // сбрасываем флаг
      submitButton.disabled = false; // включаем кнопку обратно
    }
  });
});
