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
                ['WBC', '5,500', '4,000-10,000 /uL'],
                ['RBC', '4.5', '4.0-5.5 mil/uL'],
                ['Hb', '14.5', '13.0-17.0 g/dL'],
                ['Hct', '43.0', '39.0-50.0%'],
                ['Plt', '250,000', '150,000-400,000 /uL'],
                ['Neut', '60%', '40-70%'],
                ['Lymph', '30%', '20-40%'] // 新增第七行
            ]
        },
        { text: 'Glucose', result: [['Glucose', '100', '70-110 mg/dL']] },
        { text: 'Na/K', result: [['Na/K', '140 / 4.0', '135-145 / 3.5-5.0 mEq/L']] },
        { text: 'BUN/Crea', result: [['BUN/Crea', '15 / 1.0', '7-20 / 0.6-1.2 mg/dL']] },
        { text: 'AST/ALT', result: [['AST/ALT', '25 / 30', '10-40 U/L']] },
        { text: 'CRP', result: [['CRP', '0.5', '<1.0 mg/dL']] },
        { text: 'Hs-Troponin I', result: [['Hs-Troponin I', '0.01', '<0.05 ng/mL']] },
        { text: 'Albumin', result: [['Albumin', '4.0', '3.5-5.0 g/dL']] },
        { text: 'Lactate', result: [['Lactate', '1.5', '<2.0 mmol/L']] },
        { text: 'XX', result: [['XX', '數值S', '正常值T']] }
    ],
    // 欄位 2: 其他檢查
    [
        // 修改: ABG 的結果為七行
        { 
            text: 'ABG', 
            result: [
                ['pH', '7.40', '7.35-7.45'],
                ['PaO2', '90', '80-100 mmHg'],
                ['PaCO2', '40', '35-45 mmHg'],
                ['HCO3-', '24', '22-26 mmol/L'],
                ['BE', '0', '-2 to +2 mmol/L'],
                ['SaO2', '97%', '95-100%'],
                ['Lac', '1.5', '<2.0 mmol/L']
            ]
        },
        // 修改: VBG 的結果為五行
        { 
            text: 'VBG', 
            result: [
                ['pH', '7.35', '7.30-7.40'],
                ['PvO2', '40', '35-45 mmHg'],
                ['PvCO2', '45', '41-51 mmHg'],
                ['HCO3-', '24', '22-26 mmol/L'],
                ['Lac', '1.5', '<2.0 mmol/L']
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
        { text: 'CXR', result: '胸部X光：可能顯示肺水腫、氣胸或肺炎。', image: 'images/image1.jpg' },
        { text: 'EKG', result: '心電圖：評估心律不整或心肌缺血。', image: 'https://via.placeholder.com/200x150/007bff/ffffff?text=Image+2' },
        { text: 'Echo', result: '心臟超音波：評估心臟結構及功能。', image: 'https://via.placeholder.com/200x150/28a745/ffffff?text=Image+3' },
        { text: 'Chest CT', result: '胸部電腦斷層：更精確地評估肺部結構。', image: 'https://via.placeholder.com/200x150/dc3545/ffffff?text=Image+4' },
        { text: 'XX', result: '氧氣治療：提高血氧飽和度。', image: 'https://via.placeholder.com/200x150/ffc107/ffffff?text=Image+5' },
        { text: 'XX', result: '抽血檢驗：進一步確認病因。', image: 'https://via.placeholder.com/200x150/17a2b8/ffffff?text=Image+6' },
        { text: 'XX', result: '心臟監測：持續觀察心律。', image: 'https://via.placeholder.com/200x150/6c757d/ffffff?text=Image+7' },
        { text: 'XX', result: '電腦斷層掃描：用於更精確的影像診斷。', image: 'https://via.placeholder.com/200x150/6610f2/ffffff?text=Image+8' },
        { text: 'XX', result: '血壓監測：用於持續觀察血壓。', image: 'https://via.placeholder.com/200x150/e83e8c/ffffff?text=Image+9' },
        { text: 'XX', result: '其他：根據醫囑進行個別化處理。', image: 'https://via.placeholder.com/200x150/fd7e14/ffffff?text=Image+10' }
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