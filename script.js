document.getElementById("apiForm").addEventListener("submit", async function (event) {
    event.preventDefault();
    const sehir = document.getElementById("sehir").value;
    const sehir2 = document.getElementById("sehir2").value;
    const hata = document.getElementById("hata");
    const hata2 = document.getElementById("hata2");
    
    // API URL'sini ve diğer seçenekleri belirleyin
    const apiUrl = `https://cost-of-living-and-prices.p.rapidapi.com/prices?city_name=${sehir}&country_name=Turkey`;
    const apiUrl2 = `https://cost-of-living-and-prices.p.rapidapi.com/prices?city_name=${sehir2}&country_name=Turkey`;

    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'e8c3bcc6abmsh95c00276f6e0e79p1f9369jsn36cc6d210340',
            'X-RapidAPI-Host': 'cost-of-living-and-prices.p.rapidapi.com'
        }
    };

    try {
        const tablo = document.querySelector(".tableFixHead");
        const tablo2 = document.querySelector(".tableFixHead2"); // İkinci tablo için seçimi ekleyin

        const response = await fetch(apiUrl, options);
        const response2 = await fetch(apiUrl2, options); // İkinci API çağrısını ekleyin

        if (sehir && sehir2) {
            tablo.style.display = "block";
            tablo2.style.display = "block"; // İkinci tabloyu görünür yapın
        } else {
            tablo.style.display = "block";
            tablo2.style.display = "none"; // İkinci tabloyu gizleyin
        }

        if (response.status === 200) {
            const result = await response.json();
            if (result && result.prices) {
                let resultText = '';
                for (const item of result.prices) {
                    resultText += `<tr>
                    <td>${item.item_name}:</td>
                    <td> ${item.min}</td>
                    </tr>`;
                }
                document.getElementById('apiResult').innerHTML = resultText;
                hata.style.display = 'none';
            } else {
                hata.style.display = "block";
                hata.innerHTML = "Hatalı giriş ya da Türkçe karakter problemi ile karşılaştık!";
                console.error("API yanıtı beklenen veri yapısını içermiyor.");
            }
        } else {
            console.error(`API'den hata kodu: ${response.status}`);
        }

        // İkinci arama işlemi
        if (sehir2) { // İkinci il girildiyse işle
            if (response2.status === 200) {
                const result2 = await response2.json();
                if (result2 && result2.prices) {
                    let resultText2 = '';
                    for (const item of result2.prices) {
                        resultText2 += `<tr>
                        <td>${item.item_name}:</td>
                        <td> ${item.min}</td>
                        </tr>`;
                    }
                    document.getElementById('apiResult2').innerHTML = resultText2;
                    hata2.style.display = 'none';
                } else {
                    hata2.style.display = "block";
                    hata2.innerHTML = "Hatalı giriş ya da Türkçe karakter problemi ile karşılaştık!";
                    console.error("API yanıtı beklenen veri yapısını içermiyor.");
                }
            } else {
                console.error(`API'den hata kodu: ${response2.status}`);
            }
        }
    } catch (error) {
        console.error(error);
    }
});


