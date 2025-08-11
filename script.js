// 在這裡加入 JavaScript 程式碼
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
        { text: 'Lactate', result: [['Lactate', '6.6', '0.4-2.0']] },
        { text: 'XX', result: [['XX', '數值S', '正常值T']] }
    ],
    // 欄位 2: 其他檢查
    [
        // 修改: ABG 的結果為七行
        { 
            text: 'ABG', 
            result: [
                ['ABG-pH', '<span class="abg-red-value">7.099</span>' , '7.35-7.45'],
                ['ABG-PCO2', '15.0', '35-45'],                
                ['ABG-PO2', '70.5', '80-100'],
                ['ABG-HCO3', '4.7', '21-28'],
                ['ABG-Base Excess', '-22.1', '-2.3-2.4'],
                ['FiO2', '80%', ''],
                ['P/F ratio', '88.1', '']
            ]
        },
        // 修改: VBG 的結果為五行
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
        { text: 'XX', result: [['XX', '數值CC', '正常值DD']] },
        { text: 'XX', result: [['XX', '數值EE', '正常值FF']] },
        { text: 'XX', result: [['XX', '數值GG', '正常值HH']] },
        { text: 'XX', result: [['XX', '數值II', '正常值JJ']] },
        { text: 'XX', result: [['XX', '數值KK', '正常值LL']] },
        { text: 'XX', result: [['XX', '數值MM', '正常值NN']] }
    ],
    // 欄位 3: 影像檢查 (圖片和文字描述)
    [
        { text: 'CXR', result: '', image: 'images/image1.jpg' },
        { text: 'EKG', result: '', image: 'https://via.placeholder.com/200x150/007bff/ffffff?text=Image+2' },
        { text: 'Echo', result: '', image: 'https://via.placeholder.com/200x150/28a745/ffffff?text=Image+3' },
        { text: 'Chest CT', result: '', image: 'https://via.placeholder.com/200x150/dc3545/ffffff?text=Image+4' },
        { text: 'XX', result: '', image: 'https://via.placeholder.com/200x150/ffc107/ffffff?text=Image+5' },
        { text: 'XX', result: '', image: 'https://via.placeholder.com/200x150/17a2b8/ffffff?text=Image+6' },
        { text: 'XX', result: '', image: 'https://via.placeholder.com/200x150/6c757d/ffffff?text=Image+7' },
        { text: 'XX', result: '', image: 'https://via.placeholder.com/200x150/6610f2/ffffff?text=Image+8' },
        { text: 'XX', result: '', image: 'https://via.placeholder.com/200x150/e83e8c/ffffff?text=Image+9' },
        { text: 'XX', result: '', image: 'https://via.placeholder.com/200x150/fd7e14/ffffff?text=Image+10' }
    ]
];

// 步驟一：動態生成所有複選框
const checkboxGroups = document.querySelectorAll('.checkbox-group');
columnData.forEach((column, colIndex) => {
    column.forEach((item, itemIndex) => {
        const label = document.createElement('label');
        label.innerHTML = `<input type="checkbox" name="option-${colIndex}" value="${itemIndex}"> ${item.text}`;
        checkboxGroups[colIndex].appendChild(label);
    });
});

// 步驟二：為提交按鈕添加點擊事件
submitBtn.addEventListener('click', () => {
    selectionGrid.style.display = 'none';
    submitBtn.style.display = 'none';
    resultSection.style.display = 'block';

    // 清空舊的結果，但保留標題和表頭
    resultColumn1.querySelectorAll('.result-values, .result-item').forEach(el => el.remove());
    resultColumn2.querySelectorAll('.result-values, .result-item').forEach(el => el.remove());
    column3TextResults.innerHTML = '';
    column3ImageResults.innerHTML = '';
    
    // 預設隱藏欄位3的結果容器
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
                        // 遍歷每一行結果
                        item.result.forEach(row => {
                            const resultValues = document.createElement('div');
                            resultValues.classList.add('result-values');
                            // 遍歷每一行中的每個數值
                            row.forEach(value => {
                                const span = document.createElement('span');
                                span.textContent = value;
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

                    const textItem = document.createElement('div');
                    textItem.classList.add('result-item');
                    textItem.textContent = item.result;
                    column3TextResults.appendChild(textItem);

                    const imageElement = document.createElement('img');
                    imageElement.classList.add('result-image');
                    imageElement.src = item.image;
                    imageElement.alt = item.text;
                    column3ImageResults.appendChild(imageElement);
                });
            }
        } else {
            if (colIndex === 0 || colIndex === 1) {
                const noSelection = document.createElement('div');
                noSelection.classList.add('result-item');
                noSelection.textContent = '此欄位未選擇任何項目。';
                resultColumn.appendChild(noSelection);
            } else if (colIndex === 2) {
                column3ResultContainer.style.display = 'none';
            }
        }
    });
});

// 為返回按鈕添加點擊事件
resultBackBtn.addEventListener('click', () => {
    // 隱藏結果畫面，顯示選取畫面
    resultSection.style.display = 'none';
    selectionGrid.style.display = 'grid';
    submitBtn.style.display = 'block';
});