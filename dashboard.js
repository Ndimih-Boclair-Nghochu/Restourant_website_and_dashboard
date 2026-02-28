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

// sample chart data (replace with real data in app.js)
const revenueCtx = document.getElementById('revenueChart').getContext('2d');
const ordersCtx = document.getElementById('ordersChart').getContext('2d');

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

// merge mobile-responsive helpers
// (this part came from earlier mobile-responsive.js but may no longer be needed)
document.addEventListener('DOMContentLoaded', function() {
    const oldSidebar = document.querySelector('.sidebar');
    const navBtns = oldSidebar ? oldSidebar.querySelectorAll('.nav-btn') : [];
    const oldHamburger = document.querySelector('.hamburger-menu');

    if (oldHamburger && oldSidebar) {
        oldHamburger.addEventListener('click', function(e) {
            e.stopPropagation();
            oldSidebar.classList.toggle('sidebar-open');
            document.body.classList.toggle('sidebar-active');
            oldHamburger.innerHTML = oldSidebar.classList.contains('sidebar-open') ? '✕' : '☰';
            document.body.style.overflow = oldSidebar.classList.contains('sidebar-open') ? 'hidden' : 'auto';
        });

        navBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                if (window.innerWidth < 768) {
                    oldSidebar.classList.remove('sidebar-open');
                    document.body.classList.remove('sidebar-active');
                    oldHamburger.innerHTML = '☰';
                    document.body.style.overflow = 'auto';
                }
            });
        });

        document.addEventListener('click', function(event) {
            if (window.innerWidth < 768 && oldSidebar.classList.contains('sidebar-open')) {
                if (!oldSidebar.contains(event.target) && !oldHamburger.contains(event.target)) {
                    oldSidebar.classList.remove('sidebar-open');
                    document.body.classList.remove('sidebar-active');
                    oldHamburger.innerHTML = '☰';
                    document.body.style.overflow = 'auto';
                }
            }
        });

        let resizeTimer;
        window.addEventListener('resize', function() {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(function() {
                if (window.innerWidth >= 768 && oldSidebar.classList.contains('sidebar-open')) {
                    oldSidebar.classList.remove('sidebar-open');
                    document.body.classList.remove('sidebar-active');
                    oldHamburger.innerHTML = '☰';
                    document.body.style.overflow = 'auto';
                }
            }, 100);
        });
    }

    if ('ontouchstart' in window) {
        document.body.classList.add('touch-device');
    }
});

// sample loading state and dummy data for table
const transactionsBody = document.getElementById('transactionsBody');
if(transactionsBody){
    for(let i=1;i<=10;i++){
        const tr = document.createElement('tr');
        tr.innerHTML=`<td>2026-02-${i}</td><td>User ${i}</td><td>#00${i}</td><td>$${i*50}</td><td>${i%2? 'Completed':'Pending'}</td>`;
        transactionsBody.appendChild(tr);
    }
}
