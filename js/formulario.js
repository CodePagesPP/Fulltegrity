document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("formulario");


  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    try {
      const response = await fetch("php/form-handler.php", {
        method: "POST",
        body: formData,
      });

      const result = await response.text();
      alert(result);
      form.reset();
    } catch (error) {
      alert("Hubo un error al enviar el formulario.");
    }
  });
});
