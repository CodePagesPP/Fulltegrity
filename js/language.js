function redirectToPage(select){
    const selectedValue = select.value;
    if (selectedValue){
        window.location.href = selectedValue;
    }
}