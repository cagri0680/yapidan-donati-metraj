(function(){'use strict';let result=null;
const el=id=>document.getElementById(id);
const fmt=(n,d=6)=>n!==0&&Math.abs(n)<Math.pow(10,-d)?n.toExponential(6).replace('.',','):new Intl.NumberFormat('tr-TR',{maximumFractionDigits:d}).format(n);
function trace(){return ['Yapıdan bağımsız eğitim örneği','Çap: '+result.diameter_mm+' mm','Boy: '+result.length_m+' m','Adet: '+result.count,'Yoğunluk kabulü: '+result.density_kg_m3+' kg/m³','Kesit alanı: '+result.area_m2+' m²','Birim kütle: '+result.kg_per_m+' kg/m','Toplam teorik kütle: '+result.total_kg+' kg','Model: ideal dairesel kesit. Tasarım/uygunluk denetimi değildir.'].join('\n');}
function render(){el('error').hidden=true;el('feedback').textContent='';
try{result=RebarDemo.calculate({diameter_mm:el('diameter').value,length:el('length').value,length_unit:el('unit').value,count:el('count').value});
el('total').textContent=fmt(result.total_kg,4);el('single').textContent='Tek çubuk: '+fmt(result.single_kg,4)+' kg';
el('steps').replaceChildren();[['Çapın metre karşılığı',fmt(result.diameter_m,6)+' m'],['Boyun metre karşılığı',fmt(result.length_m,6)+' m'],['İdeal kesit alanı',fmt(result.area_m2,10)+' m²'],['Birim kütle',fmt(result.kg_per_m,8)+' kg/m'],['Adet',fmt(result.count,0)]].forEach(([key,val])=>{const dt=document.createElement('dt'),dd=document.createElement('dd');dt.textContent=key;dd.textContent=val;el('steps').append(dt,dd);});el('copy').disabled=false;el('csv').disabled=false;
}catch(e){result=null;el('total').textContent='—';el('single').textContent='Geçerli girdilerle yeniden hesaplayın.';el('steps').replaceChildren();el('error').textContent=e.message;el('error').hidden=false;el('copy').disabled=true;el('csv').disabled=true;}}
el('calc-form').addEventListener('input',render);
el('calc-form').addEventListener('change',render);
el('calc-form').addEventListener('submit',e=>{e.preventDefault();render();});
el('copy').addEventListener('click',async()=>{if(!result)return;try{await navigator.clipboard.writeText(trace());el('feedback').textContent='Hesap izi kopyalandı.';}catch(_){el('feedback').textContent='Tarayıcı panoya izin vermedi. CSV dosyası alınabilir.';}});
el('csv').addEventListener('click',()=>{if(!result)return;const keys=['diameter_mm','length_m','count','density_kg_m3','area_m2','kg_per_m','single_kg','total_kg','origin','model_version'];const txt=keys.join(',')+'\r\n'+keys.map(k=>result[k]).join(',')+'\r\n';const blob=new Blob([txt],{type:'text/csv;charset=utf-8'});const url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download='donati_teorik_hesap.csv';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);el('feedback').textContent='Hesap CSV dosyası oluşturuldu.';});
render();})();
