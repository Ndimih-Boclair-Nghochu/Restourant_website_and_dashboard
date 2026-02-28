// basic interactivity and chart initialization

// sidebar toggle for mobile/tablet
const sidebar = document.getElementById('sidebar');
const collapseBtn = document.getElementById('collapseBtn');
const hamburger = document.getElementById('hamburger');

collapseBtn.addEventListener('click', () => {
    sidebar.classList.toggle('collapsed');
    document.querySelector('.main-area').classList.toggle('collapsed');
});

hamburger.addEventListener('click', () => {
    sidebar.classList.toggle('open');
});

// sample chart data
const revenueCtx = document.getElementById('revenueChart').getContext('2d');
const ordersCtx = document.getElementById('ordersChart').getContext('2d');

// create line chart
new Chart(revenueCtx, {
    type: 'line',
    data: {
        labels: ['Jan','Feb','Mar','Apr','May','Jun'],
        datasets: [{
            label: 'Revenue',
            data: [1200,1500,1000,1800,1700,2000],
            borderColor: 'var(--primary)',
            backgroundColor: 'rgba(16,185,129,0.2)',
            tension: 0.4
        }]
    },
    options: {responsive:true, maintainAspectRatio:false}
});

// create pie chart
new Chart(ordersCtx, {
    type: 'pie',
    data: {
        labels:['Completed','Pending','Cancelled'],
        datasets:[{
            data:[65,25,10],
            backgroundColor:['var(--primary)','var(--accent)','var(--danger)']
        }]
    },
    options:{responsive:true, maintainAspectRatio:false}
});

// toast util
function showToast(message){
    const container = document.getElementById('toastContainer');
    const toast = document.createElement('div');
    toast.className='toast';
    toast.textContent=message;
    container.appendChild(toast);
    setTimeout(()=>container.removeChild(toast),3000);
}

// sample loading state, copy-to-clipboard and modal omitted for brevity

// populate table with dummy data
const transactionsBody = document.getElementById('transactionsBody');
for(let i=1;i<=10;i++){
    const tr = document.createElement('tr');
    tr.innerHTML=`<td>2026-02-${i}</td><td>User ${i}</td><td>#00${i}</td><td>$${i*50}</td><td>${i%2? 'Completed':'Pending'}</td>`;
    transactionsBody.appendChild(tr);
}
