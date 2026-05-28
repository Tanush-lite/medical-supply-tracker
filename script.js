### script.js

```javascript
let disasterMode = false;

let supplies = [
    { id: 1, name: "Oxygen Cylinders", count: 18, max: 40, min: 10 },
    { id: 2, name: "IV Fluid Packs", count: 25, max: 100, min: 15 },
    { id: 3, name: "Trauma Kits", count: 35, max: 150, min: 20 }
];

function addNewItem() {
    const nameIn = document.getElementById('new-name');
    const countIn = document.getElementById('new-count');
    const minIn = document.getElementById('new-min');

    if (nameIn.value === '' || countIn.value === '' || minIn.value === '') return;

    supplies.push({
        id: Date.now(),
        name: nameIn.value,
        count: parseInt(countIn.value),
        min: parseInt(minIn.value),
        max: parseInt(countIn.value) * 2
    });

    nameIn.value = '';
    countIn.value = '';
    minIn.value = '';

    render();
}

function activateDisasterMode() {
    disasterMode = true;

    document.getElementById('bulk-order-zone').classList.remove('hidden');
    document.getElementById('disaster-trigger-btn').classList.add('hidden');

    render();
}

function render() {
    const list = document.getElementById('inventory-list');

    list.innerHTML = '';

    supplies.forEach(item => {

        const isCritical = item.count <= item.min;

        const percent = Math.min((item.count / item.max) * 100, 100);

        const barColor =
            isCritical ? 'bg-red-500'
            : percent < 30 ? 'bg-amber-400'
            : 'bg-emerald-500';

        list.innerHTML += `
            <div class="p-8 flex flex-col ${isCritical ? 'bg-red-50' : 'bg-white'} transition-all">

                <div class="flex justify-between items-center mb-4">

                    <div class="flex-1">
                        <h3 class="font-black text-slate-800 text-xl uppercase tracking-tighter">
                            ${item.name}
                        </h3>

                        <p class="text-[10px] font-bold ${isCritical ? 'text-red-500' : 'text-slate-400'} uppercase tracking-widest italic">
                            Safety Threshold: ${item.min} Units
                        </p>
                    </div>

                    <div class="flex items-center gap-6">

                        <div class="text-right">
                            <p class="text-4xl font-black ${isCritical ? 'text-red-600' : 'text-slate-800'}">
                                ${item.count}
                            </p>

                            <p class="text-[10px] font-bold uppercase text-slate-400 italic">
                                Available
                            </p>
                        </div>

                        <div class="flex flex-col gap-1">

                            <button onclick="updateStock(${item.id}, 1)"
                                class="w-12 h-10 bg-white shadow-sm rounded-t-lg border border-gray-200 hover:bg-gray-50 font-bold">
                                +
                            </button>

                            <button onclick="updateStock(${item.id}, -1)"
                                class="w-12 h-10 bg-white shadow-sm rounded-b-lg border border-gray-200 hover:bg-gray-50 font-bold">
                                -
                            </button>

                        </div>
                    </div>
                </div>

                <div class="w-full bg-slate-200 h-2 rounded-full overflow-hidden shadow-inner mb-4">
                    <div class="h-full ${barColor} transition-all duration-700"
                        style="width:${percent}%">
                    </div>
                </div>
            </div>
        `;
    });
}

function updateStock(id, amt) {

    const item = supplies.find(s => s.id === id);

    if (item.count + amt >= 0) {
        item.count += amt;
        render();
    }
}

render();
```
