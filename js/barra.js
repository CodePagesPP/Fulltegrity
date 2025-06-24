document.addEventListener("DOMContentLoaded", () => {
    const counters = document.querySelectorAll('.counter');
    const speed = 100; 

    const animateCounters = () => {
      counters.forEach(counter => {
        const updateCount = () => {
          const target = +counter.getAttribute('data-target');
          const count = +counter.innerText.replace(/,/g, '');

        
          const increment = Math.max(Math.floor(target / speed), 1);

          if (count < target) {
            counter.innerText = formatNumber(count + increment);
            setTimeout(updateCount, 20);
          } else {
            counter.innerText = formatNumber(target);
          }
        };

        updateCount();
      });
    };

    const formatNumber = (num) => {
      return num.toLocaleString('en-US'); 
    };

   
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounters();
          observer.disconnect();
        }
      });
    }, { threshold: 0.3 });

    if (counters.length) observer.observe(counters[0]);
  });