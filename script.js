// 在這裡加入 JavaScript 程式碼
        const submitBtn = document.getElementById('submit-btn');
        const selectionGrid = document.getElementById('selection-grid');
        const resultSection = document.getElementById('result-section');

        // 定義每個欄位的選項和對應的結果
        const columnData = [
            // 欄位 1 的選項和結果
            [
                { text: '胸部X光', result: '胸部X光：可能顯示肺水腫、氣胸或肺炎。' },
                { text: '心電圖', result: '心電圖：評估心律不整或心肌缺血。' },
                { text: '動脈血氣體分析', result: '動脈血氣體分析：評估氧合及酸鹼平衡。' },
                { text: '血氧飽和度', result: '血氧飽和度：初步判斷缺氧情況。' },
                { text: '完整血球計數', result: '完整血球計數：檢查貧血或感染指標。' },
                { text: '生物標記物', result: '生物標記物：如BNP、Troponin，評估心衰竭或心肌梗塞。' },
                { text: '電解質', result: '電解質：評估代謝性問題或脫水。' },
                { text: '血糖', result: '血糖：排除糖尿病酮酸中毒等原因。' },
                { text: '胸部超音波', result: '胸部超音波：快速評估肺積水或氣胸。' },
                { text: 'D-dimer', result: 'D-dimer：懷疑肺栓塞時的輔助檢查。' }
            ],
            // 欄位 2 的選項和結果
            [
                { text: '肺功能測試', result: '肺功能測試：評估氣道阻塞或限制性疾病。' },
                { text: '胸部電腦斷層', result: '胸部電腦斷層：更精確地評估肺部結構。' },
                { text: '肺通氣/灌注掃描', result: '肺通氣/灌注掃描：評估肺栓塞。' },
                { text: '心臟超音波', result: '心臟超音波：評估心臟結構及功能。' },
                { text: '腹部超音波', result: '腹部超音波：評估腹部病因。' },
                { text: '肝腎功能', result: '肝腎功能：評估系統性疾病。' },
                { text: '甲狀腺功能', result: '甲狀腺功能：排除甲狀腺機能亢進。' },
                { text: '毒物篩檢', result: '毒物篩檢：懷疑藥物中毒時。' },
                { text: '支氣管鏡檢查', result: '支氣管鏡檢查：直接觀察氣道狀況。' },
                { text: '動脈血壓監測', result: '動脈血壓監測：持續觀察血壓變化。' }
            ],
            // 欄位 3 的選項和結果（新增圖片路徑屬性）
            [
                { text: '氣管內管置入', result: '氣管內管置入：當病人呼吸衰竭時。', image: 'https://via.placeholder.com/200x150/ff0000/ffffff?text=Image+1' },
                { text: '胸管置入', result: '胸管置入：用於排除氣胸或血胸。', image: 'https://via.placeholder.com/200x150/007bff/ffffff?text=Image+2' },
                { text: '非侵入性呼吸器', result: '非侵入性呼吸器：如BiPAP，協助呼吸。', image: 'https://via.placeholder.com/200x150/28a745/ffffff?text=Image+3' },
                { text: '藥物治療', result: '藥物治療：根據病因給予支氣管擴張劑、利尿劑等。', image: 'https://via.placeholder.com/200x150/dc3545/ffffff?text=Image+4' },
                { text: '氧氣治療', result: '氧氣治療：提高血氧飽和度。', image: 'https://via.placeholder.com/200x150/ffc107/ffffff?text=Image+5' },
                { text: '抽血檢驗', result: '抽血檢驗：進一步確認病因。', image: 'https://via.placeholder.com/200x150/17a2b8/ffffff?text=Image+6' },
                { text: '心臟監測', result: '心臟監測：持續觀察心律。', image: 'https://via.placeholder.com/200x150/6c757d/ffffff?text=Image+7' },
                { text: '電腦斷層掃描', result: '電腦斷層掃描：用於更精確的影像診斷。', image: 'https://via.placeholder.com/200x150/6610f2/ffffff?text=Image+8' },
                { text: '血壓監測', result: '血壓監測：用於持續觀察血壓。', image: 'https://via.placeholder.com/200x150/e83e8c/ffffff?text=Image+9' },
                { text: '其他', result: '其他：根據醫囑進行個別化處理。', image: 'https://via.placeholder.com/200x150/fd7e14/ffffff?text=Image+10' }
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
            // 隱藏選取畫面，顯示結果畫面
            selectionGrid.style.display = 'none';
            submitBtn.style.display = 'none';
            resultSection.style.display = 'block';

            // 清空舊的結果
            const resultColumn1 = document.getElementById('result-column-1');
            const resultColumn2 = document.getElementById('result-column-2');
            const column3ResultContainer = document.getElementById('column-3-result-container');
            const column3TextResults = document.getElementById('column-3-text-results');
            const column3ImageResults = document.getElementById('column-3-image-results');

            resultColumn1.innerHTML = '<h3>欄位 1 結果</h3>';
            resultColumn2.innerHTML = '<h3>欄位 2 結果</h3>';
            column3TextResults.innerHTML = '';
            column3ImageResults.innerHTML = '';

            // 處理每個欄位的結果
            columnData.forEach((column, colIndex) => {
                const checkedCheckboxes = document.querySelectorAll(`input[name="option-${colIndex}"]:checked`);
                
                if (checkedCheckboxes.length > 0) {
                    // 如果是欄位 1 或 2，照舊處理文字結果
                    if (colIndex === 0 || colIndex === 1) {
                        const resultColumn = document.getElementById(`result-column-${colIndex + 1}`);
                        checkedCheckboxes.forEach(checkbox => {
                            const selectedIndex = parseInt(checkbox.value, 10);
                            const result = column[selectedIndex].result;
                            const resultItem = document.createElement('div');
                            resultItem.classList.add('result-item');
                            resultItem.textContent = result;
                            resultColumn.appendChild(resultItem);
                        });
                    } 
                    // 如果是欄位 3，分別處理文字和圖片
                    else if (colIndex === 2) {
                        checkedCheckboxes.forEach(checkbox => {
                            const selectedIndex = parseInt(checkbox.value, 10);
                            const item = column[selectedIndex];

                            // 插入文字結果
                            const textItem = document.createElement('div');
                            textItem.classList.add('result-item');
                            textItem.textContent = item.result;
                            column3TextResults.appendChild(textItem);

                            // 插入圖片結果
                            const imageElement = document.createElement('img');
                            imageElement.classList.add('result-image');
                            imageElement.src = item.image;
                            imageElement.alt = item.text;
                            column3ImageResults.appendChild(imageElement);
                        });
                    }
                } else {
                    // 處理未選擇的狀態
                    if (colIndex === 0 || colIndex === 1) {
                        const resultColumn = document.getElementById(`result-column-${colIndex + 1}`);
                        const noSelection = document.createElement('div');
                        noSelection.classList.add('result-item');
                        noSelection.textContent = '此欄位未選擇任何項目。';
                        resultColumn.appendChild(noSelection);
                    } else if (colIndex === 2) {
                        const noSelection = document.createElement('div');
                        noSelection.classList.add('result-item');
                        noSelection.textContent = '此欄位未選擇任何項目。';
                        column3TextResults.appendChild(noSelection);
                    }
                }
            });
        });