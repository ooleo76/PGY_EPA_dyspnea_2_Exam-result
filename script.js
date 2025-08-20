// 急性呼吸困難評估系統 JavaScript 程式碼
const submitBtn = document.getElementById('submit-btn');
const selectionGrid = document.getElementById('selection-grid');
const resultSection = document.getElementById('result-section');
const resultBackBtn = document.getElementById('result-back-btn');

// 取得結果區的 DOM 元素
const resultColumn1 = document.getElementById('result-column-1');
const resultColumn2 = document.getElementById('result-column-2');
const column3ResultContainer = document.getElementById('column-3-result-container');
const column3TextResults = document.getElementById('column-3-text-results');
const column3ImageResults = document.getElementById('column-3-image-results');

// 定義每個欄位的選項和對應的結果
const columnData = [
    // 欄位 1: 血液/生化檢查
    [
        {
            text: 'CBC/DC',
            result: [
                ['WBC', '18.6', '3.4-9.1'],
                ['-Band', '0', '0-3%'],
                ['-Segment', '94', '45-70%'],
                ['-lym.', '2', '20-45%'],
                ['Hb', '3.2', '13.5-17.5 g/dL'],
                ['Platelet', '359', '150-400'],
            ]
        },
        { text: 'Glucose', result: [['Glucose', '156', '70-199']] },
        { text: 'Na/K', result: [
                ['Na', '139', '136-145'],
                ['K', '4.96', '3.5-5.0']
            ] },
        { text: 'BUN/Crea', result: [
                ['Crea', '29.59', '0.72-1.25'],
                ['BUN', '285', '6-20']
            ] },
        { text: 'AST/ALT', result: [
                ['ALT', '68', '2-40'],
                ['AST', '57', '5-34']
            ] },
        { text: 'CRP', result: [['CRP', '240', '<5']] },
        { text: 'Hs-Troponin I', result: [['Hs-Troponin I', '74', '<26']] },
        { text: 'Albumin', result: [['Albumin', '2.2', '3.8-5.3']] },
        { text: 'Mg', result: [['Mg', '4.0', '1.9-2.5']] },
        { text: 'P', result: [['P', '17.8', '2.7-4.5']] }
    ],
    // 欄位 2: 其他檢查
    [
        { 
            text: 'ABG', 
            result: [
                ['ABG-pH', '7.099' , '7.35-7.45'],
                ['ABG-PCO2', '15.0', '35-45'],                
                ['ABG-PO2', '70.5', '80-100'],
                ['ABG-HCO3', '4.7', '21-28'],
                ['ABG-Base Excess', '-22.1', '-2.3-2.4'],
                ['FiO2', '80%', ''],
                ['P/F ratio', '88.1', '']
            ]
        },
        { 
            text: 'VBG', 
            result: [
                ['ABG-pH', '7.084', '7.35-7.45'],
                ['ABG-PCO2', '19.0', '35-45'],                
                ['ABG-PO2', '34.1', '80-100'],
                ['ABG-HCO3', '5.9', '21-28'],
                ['ABG-Base Excess', '-21.1', '-2.3-2.4'],
            ]
        },
        { text: 'D-Dimer', result: [['D-Dimer', '200', '<500 ng/mL']] },
        { text: 'PT/aPTT', result: [['PT/aPTT', '12 / 30', '11-14 / 25-35 sec']] },
        { text: 'Lactate', result: [['Lactate', '6.6', '0.4-2.0']] },
        { text: 'Ketone body', result: [['Ketone body', '0.4', '<0.6']] },
        { text: 'HbA1c', result: [['HbA1c', '4.4', '<5.7']] },
        { text: 'NT-proBNP', result: [['NT-proBNP', '3754.1', '<125']] },
        { text: '', result: [['XX', '數值KK', '正常值LL']] },
        { text: '', result: [['XX', '數值MM', '正常值NN']] }
    ],
    // 欄位 3: 影像檢查 (圖片和文字描述)
    [
        { text: 'CXR', result: '', image: 'images/image1.jpg' },
        { text: 'EKG', result: '', image: 'images/EKG.jpg' },
        { text: 'ABD Echo', result: '', image: 'images/ABD_ECHO.jpg' },
        { text: 'Cardiac echo', result: '', image: 'images/CARDIAC_ECHO.jpg' },
        { text: 'Chest CT', result: '', image: 'images/CHEST_CT.gif' },
        { text: 'Brain CT', result: '', image: 'images/BRAIN_CT.gif' },
        { text: '', result: '', image: 'https://via.placeholder.com/200x150/6c757d/ffffff?text=Image+7' },
        { text: '', result: [['XX', '數值MM', '正常值NN']], image: 'https://via.placeholder.com/200x150/e83e8c/ffffff?text=Image+8' },
        { text: '', result: [['XX', '數值MM', '正常值NN']], image: 'https://via.placeholder.com/200x150/fd7e14/ffffff?text=Image+9' },
        { text: 'CXR_ETT', result: '', image: 'images/image2.jpg' }
    ]
];

// 檢查數值是否正常的函數
function checkValue(resultValue, normalRange) {
    resultValue = resultValue.trim();
    normalRange = normalRange.trim();

    if (!normalRange) return null;

    let valueNum = parseFloat(resultValue.replace(/[^0-9.\-]/g, ''));
    if (isNaN(valueNum)) return null;

    if (normalRange.startsWith('<')) {
        let limit = parseFloat(normalRange.slice(1));
        return valueNum < limit ? 'normal' : 'abnormal';
    }
    if (normalRange.startsWith('>')) {
        let limit = parseFloat(normalRange.slice(1));
        return valueNum > limit ? 'normal' : 'abnormal';
    }
    if (normalRange.includes('-')) {
        let [low, high] = normalRange.split('-').map(n => parseFloat(n));
        if (!isNaN(low) && !isNaN(high)) {
            return valueNum >= low && valueNum <= high ? 'normal' : 'abnormal';
        }
    }
    return null;
}

// 動態生成所有複選框
const checkboxGroups = document.querySelectorAll('.checkbox-group');
columnData.forEach((column, colIndex) => {
    column.forEach((item, itemIndex) => {
        const label = document.createElement('label');
        label.innerHTML = `<input type="checkbox" name="option-${colIndex}" value="${itemIndex}"> ${item.text}`;
        checkboxGroups[colIndex].appendChild(label);
    });
});

// 為提交按鈕添加點擊事件
submitBtn.addEventListener('click', () => {
    // 添加載入動畫
    submitBtn.textContent = '處理中...';
    submitBtn.classList.add('loading');
    
    setTimeout(() => {
        selectionGrid.style.display = 'none';
        submitBtn.style.display = 'none';
        resultSection.style.display = 'block';

        // 清空舊的結果，但保留標題和表頭
        resultColumn1.querySelectorAll('.result-values').forEach(el => el.remove());
        resultColumn2.querySelectorAll('.result-values').forEach(el => el.remove());
        column3TextResults.innerHTML = '';
        column3ImageResults.innerHTML = '';
        
        column3ResultContainer.style.display = 'none';

        columnData.forEach((column, colIndex) => {
            const checkedCheckboxes = document.querySelectorAll(`input[name="option-${colIndex}"]:checked`);
            const resultColumn = document.getElementById(`result-column-${colIndex + 1}`);

            if (checkedCheckboxes.length > 0) {
                if (colIndex === 0 || colIndex === 1) {
                    checkedCheckboxes.forEach(checkbox => {
                        const selectedIndex = parseInt(checkbox.value, 10);
                        const item = column[selectedIndex];
                        
                        if (Array.isArray(item.result)) {
                            item.result.forEach(row => {
                                const resultValues = document.createElement('div');
                                resultValues.classList.add('result-values');
                                row.forEach((value, idx) => {
                                    const span = document.createElement('span');
                                    span.innerHTML = value;
                                    
                                    if (idx === 1) {
                                        let normalRange = row[2] || '';
                                        let status = checkValue(value, normalRange);
                                        if (status === 'normal') span.classList.add('normal-value');
                                        if (status === 'abnormal') span.classList.add('abnormal-value');
                                    }
                                   
                                    resultValues.appendChild(span);
                                });
                                resultColumn.appendChild(resultValues);
                            });
                        }
                    });
                } else if (colIndex === 2) {
                    column3ResultContainer.style.display = 'block';
                    checkedCheckboxes.forEach(checkbox => {
                        const selectedIndex = parseInt(checkbox.value, 10);
                        const item = column[selectedIndex];

                        if (item.result) {
                            const textItem = document.createElement('div');
                            textItem.classList.add('result-item');
                            textItem.textContent = item.result;
                            column3TextResults.appendChild(textItem);
                        }
                        
                        if (item.image) {
                            const imageContainer = document.createElement('div');
                            imageContainer.style.textAlign = 'center';
                            
                            const imageElement = document.createElement('img');
                            imageElement.classList.add('result-image');
                            imageElement.src = item.image;
                            imageElement.alt = item.text;
                            
                            const caption = document.createElement('p');
                            caption.style.marginTop = '10px';
                            caption.style.fontWeight = '600';
                            caption.style.color = '#2c3e50';
                            caption.textContent = item.text;
                            
                            imageContainer.appendChild(imageElement);
                            imageContainer.appendChild(caption);
                            column3ImageResults.appendChild(imageContainer);
                        }
                    });
                }
            } else {
                if (colIndex === 0 || colIndex === 1) {
                    const noSelection = document.createElement('div');
                    noSelection.classList.add('result-item');
                    noSelection.innerHTML = '<em>此分類未選擇任何檢查項目</em>';
                    noSelection.style.fontStyle = 'italic';
                    noSelection.style.color = '#7f8c8d';
                    resultColumn.appendChild(noSelection);
                } else if (colIndex === 2) {
                    column3ResultContainer.style.display = 'none';
                }
            }
        });
        
        // 重置按鈕狀態
        submitBtn.textContent = '開始檢查';
        submitBtn.classList.remove('loading');
    }, 800);
});

// 為返回按鈕添加點擊事件
resultBackBtn.addEventListener('click', () => {
    resultSection.style.display = 'none';
    selectionGrid.style.display = 'grid';
    submitBtn.style.display = 'block';
    
    // 滾動到頂部
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// 圖片點擊放大功能
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('result-image')) {
        const overlay = document.createElement('div');
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.9);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 10000;
            cursor: pointer;
        `;
        
        const enlargedImg = document.createElement('img');
        enlargedImg.src = e.target.src;
        enlargedImg.alt = e.target.alt;
        enlargedImg.style.cssText = `
            max-width: 90%;
            max-height: 90%;
            border-radius: 10px;
            box-shadow: 0 20px 60px rgba(0,0,0,0.5);
        `;
        
        overlay.appendChild(enlargedImg);
        document.body.appendChild(overlay);
        
        overlay.addEventListener('click', () => {
            document.body.removeChild(overlay);
        });
    }
});