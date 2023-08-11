var counter = 1;

function addStudent(){
    counter++; 
    var div = document.createElement("div");
    div.setAttribute("class","students");
    div.setAttribute("id",`student${counter}`);
    var html = '<h3>الطالب رقم '+counter+'</h3>\
    <div class="form-group">\
      <label for="studentName">الاسم</label>\
      <input class="form-control" id="studentName" name="studentName'+counter+'" placeholder="مثال: خالد احمد " />\
    </div>\
    <div class="row">\
      <div class="col-12 col-md-6">\
        <div class="form-group">\
          <label for="souraOfSaving">بداية الحفظ من :</label>\
          <select class="form-control" id="souraOfSaving" name="souraOfSaving'+counter+'" required>\
            <option value="" selected disabled hidden>اختر السورة</option>\
            <option value="0">ايقاف الحفظ</option>\
            <option value="1">سورة البقرة</option>\
            <option value="2">سورة آل عمران</option>\
            <option value="3">سورة النساء</option>\
            <option value="4">سورة المائدة</option>\
            <option value="5">سورة الأنعام</option>\
            <option value="6">سورة الأعراف</option>\
            <option value="7">سورة الأنفال</option>\
            <option value="8">سورة التوبة</option>\
            <option value="9">سورة يونس</option>\
            <option value="10">سورة هود</option>\
            <option value="11">سورة يوسف</option>\
            <option value="12">سورة الرعد</option>\
            <option value="13">سورة إبراهيم</option>\
            <option value="14">سورة الحجر</option>\
            <option value="15">سورة النحل</option>\
            <option value="16">سورة الإسراء</option>\
            <option value="17">سورة الكهف</option>\
            <option value="18">سورة مريم</option>\
            <option value="19">سورة طه</option>\
            <option value="20">سورة الأنبياء</option>\
            <option value="21">سورة الحج</option>\
            <option value="22">سورة المؤمنون</option>\
            <option value="23">سورة النّور</option>\
            <option value="24">سورة الفرقان</option>\
            <option value="25">سورة الشعراء</option>\
            <option value="26">سورة النّمل</option>\
            <option value="27">سورة القصص</option>\
            <option value="28">سورة العنكبوت</option>\
            <option value="29">سورة الرّوم</option>\
            <option value="30">سورة لقمان</option>\
            <option value="31">سورة السجدة</option>\
            <option value="32">سورة الأحزاب</option>\
            <option value="33">سورة سبأ</option>\
            <option value="34">سورة فاطر</option>\
            <option value="35">سورة يس</option>\
            <option value="36">سورة الصافات</option>\
            <option value="37">سورة ص</option>\
            <option value="38">سورة الزمر</option>\
            <option value="39">سورة غافر</option>\
            <option value="40">سورة فصّلت</option>\
            <option value="41">سورة الشورى</option>\
            <option value="42">سورة الزخرف</option>\
            <option value="43">سورة الدّخان</option>\
            <option value="44">سورة الجاثية</option>\
            <option value="45">سورة الأحقاف</option>\
            <option value="46">سورة محمد</option>\
            <option value="47">سورة الفتح</option>\
            <option value="48">سورة الحجرات</option>\
            <option value="49">سورة ق</option>\
            <option value="50">سورة الذاريات</option>\
            <option value="51">سورة الطور</option>\
            <option value="52">سورة النجم</option>\
            <option value="53">سورة القمر</option>\
            <option value="54">سورة الرحمن</option>\
            <option value="55">سورة الواقعة</option>\
            <option value="56">سورة الحديد</option>\
            <option value="57">سورة المجادلة</option>\
            <option value="58">سورة الحشر</option>\
            <option value="59">سورة الممتحنة</option>\
            <option value="60">سورة الصف</option>\
            <option value="61">سورة الجمعة</option>\
            <option value="62">سورة المنافقون</option>\
            <option value="63">سورة التغابن</option>\
            <option value="64">سورة الطلاق</option>\
            <option value="65">سورة التحريم</option>\
            <option value="66">سورة الملك</option>\
            <option value="67">سورة القلم</option>\
            <option value="68">سورة الحاقة</option>\
            <option value="69">سورة المعارج</option>\
            <option value="70">سورة نوح</option>\
            <option value="71">سورة الجن</option>\
            <option value="72">سورة المزّمّل</option>\
            <option value="73">سورة المدّثر</option>\
            <option value="74">سورة القيامة</option>\
            <option value="75">سورة الإنسان</option>\
            <option value="76">سورة المرسلات</option>\
            <option value="77">سورة النبأ</option>\
            <option value="78">سورة النازعات</option>\
            <option value="79">سورة عبس</option>\
            <option value="80">سورة التكوير</option>\
            <option value="81">سورة الإنفطار</option>\
            <option value="82">سورة المطفّفين</option>\
            <option value="83">سورة الإنشقاق</option>\
            <option value="84">سورة البروج</option>\
            <option value="85">سورة الطارق</option>\
            <option value="86">سورة الأعلى</option>\
            <option value="87">سورة الغاشية</option>\
            <option value="88">سورة الفجر</option>\
            <option value="89">سورة البلد</option>\
            <option value="90">سورة الشمس</option>\
            <option value="91">سورة الليل</option>\
            <option value="92">سورة الضحى</option>\
            <option value="93">سورة الشرح</option>\
            <option value="94">سورة التين</option>\
            <option value="95">سورة العلق</option>\
            <option value="96">سورة القدر</option>\
            <option value="97">سورة البينة</option>\
            <option value="98">سورة الزلزلة</option>\
            <option value="99">سورة العاديات</option>\
            <option value="100">سورة القارعة</option>\
            <option value="101">سورة التكاثر</option>\
            <option value="102">سورة العصر</option>\
            <option value="103">سورة الهمزة</option>\
            <option value="104">سورة الفيل</option>\
            <option value="105">سورة قريش</option>\
            <option value="106">سورة الماعون</option>\
            <option value="107">سورة الكوثر</option>\
            <option value="108">سورة الكافرون</option>\
            <option value="109">سورة النصر</option>\
            <option value="110">سورة المسد</option>\
            <option value="111">سورة الإخلاص</option>\
            <option value="112">سورة الفلق</option>\
            <option value="113">سورة النّاس</option>\
          </select>\
        </div>\
        <div class="form-group">\
          <label for="amountOfSaving">مقدار الحفظ لكل واجب:</label>\
          <input class="form-control" id="amountOfSaving" type="number" name="amountOfSaving'+counter+'" required placeholder=" ادخل عدد الاسطر (مثال: 7)" />\
        </div>\
      </div>\
      <div class="col-12 col-md-6">\
        <div class="form-group">\
          <label for="souraOfRevision">بداية المراجعة من :</label>\
          <select class="form-control" id="souraOfRevision" name="souraOfRevision'+counter+'" required>\
            <option value="" selected disabled hidden>اختر السورة</option>\
            <!-- <option value="0">سورة الفاتحة</option> -->\
            <option value="1">سورة البقرة</option>\
            <option value="2">سورة آل عمران</option>\
            <option value="3">سورة النساء</option>\
            <option value="4">سورة المائدة</option>\
            <option value="5">سورة الأنعام</option>\
            <option value="6">سورة الأعراف</option>\
            <option value="7">سورة الأنفال</option>\
            <option value="8">سورة التوبة</option>\
            <option value="9">سورة يونس</option>\
            <option value="10">سورة هود</option>\
            <option value="11">سورة يوسف</option>\
            <option value="12">سورة الرعد</option>\
            <option value="13">سورة إبراهيم</option>\
            <option value="14">سورة الحجر</option>\
            <option value="15">سورة النحل</option>\
            <option value="16">سورة الإسراء</option>\
            <option value="17">سورة الكهف</option>\
            <option value="18">سورة مريم</option>\
            <option value="19">سورة طه</option>\
            <option value="20">سورة الأنبياء</option>\
            <option value="21">سورة الحج</option>\
            <option value="22">سورة المؤمنون</option>\
            <option value="23">سورة النّور</option>\
            <option value="24">سورة الفرقان</option>\
            <option value="25">سورة الشعراء</option>\
            <option value="26">سورة النّمل</option>\
            <option value="27">سورة القصص</option>\
            <option value="28">سورة العنكبوت</option>\
            <option value="29">سورة الرّوم</option>\
            <option value="30">سورة لقمان</option>\
            <option value="31">سورة السجدة</option>\
            <option value="32">سورة الأحزاب</option>\
            <option value="33">سورة سبأ</option>\
            <option value="34">سورة فاطر</option>\
            <option value="35">سورة يس</option>\
            <option value="36">سورة الصافات</option>\
            <option value="37">سورة ص</option>\
            <option value="38">سورة الزمر</option>\
            <option value="39">سورة غافر</option>\
            <option value="40">سورة فصّلت</option>\
            <option value="41">سورة الشورى</option>\
            <option value="42">سورة الزخرف</option>\
            <option value="43">سورة الدّخان</option>\
            <option value="44">سورة الجاثية</option>\
            <option value="45">سورة الأحقاف</option>\
            <option value="46">سورة محمد</option>\
            <option value="47">سورة الفتح</option>\
            <option value="48">سورة الحجرات</option>\
            <option value="49">سورة ق</option>\
            <option value="50">سورة الذاريات</option>\
            <option value="51">سورة الطور</option>\
            <option value="52">سورة النجم</option>\
            <option value="53">سورة القمر</option>\
            <option value="54">سورة الرحمن</option>\
            <option value="55">سورة الواقعة</option>\
            <option value="56">سورة الحديد</option>\
            <option value="57">سورة المجادلة</option>\
            <option value="58">سورة الحشر</option>\
            <option value="59">سورة الممتحنة</option>\
            <option value="60">سورة الصف</option>\
            <option value="61">سورة الجمعة</option>\
            <option value="62">سورة المنافقون</option>\
            <option value="63">سورة التغابن</option>\
            <option value="64">سورة الطلاق</option>\
            <option value="65">سورة التحريم</option>\
            <option value="66">سورة الملك</option>\
            <option value="67">سورة القلم</option>\
            <option value="68">سورة الحاقة</option>\
            <option value="69">سورة المعارج</option>\
            <option value="70">سورة نوح</option>\
            <option value="71">سورة الجن</option>\
            <option value="72">سورة المزّمّل</option>\
            <option value="73">سورة المدّثر</option>\
            <option value="74">سورة القيامة</option>\
            <option value="75">سورة الإنسان</option>\
            <option value="76">سورة المرسلات</option>\
            <option value="77">سورة النبأ</option>\
            <option value="78">سورة النازعات</option>\
            <option value="79">سورة عبس</option>\
            <option value="80">سورة التكوير</option>\
            <option value="81">سورة الإنفطار</option>\
            <option value="82">سورة المطفّفين</option>\
            <option value="83">سورة الإنشقاق</option>\
            <option value="84">سورة البروج</option>\
            <option value="85">سورة الطارق</option>\
            <option value="86">سورة الأعلى</option>\
            <option value="87">سورة الغاشية</option>\
            <option value="88">سورة الفجر</option>\
            <option value="89">سورة البلد</option>\
            <option value="90">سورة الشمس</option>\
            <option value="91">سورة الليل</option>\
            <option value="92">سورة الضحى</option>\
            <option value="93">سورة الشرح</option>\
            <option value="94">سورة التين</option>\
            <option value="95">سورة العلق</option>\
            <option value="96">سورة القدر</option>\
            <option value="97">سورة البينة</option>\
            <option value="98">سورة الزلزلة</option>\
            <option value="99">سورة العاديات</option>\
            <option value="100">سورة القارعة</option>\
            <option value="101">سورة التكاثر</option>\
            <option value="102">سورة العصر</option>\
            <option value="103">سورة الهمزة</option>\
            <option value="104">سورة الفيل</option>\
            <option value="105">سورة قريش</option>\
            <option value="106">سورة الماعون</option>\
            <option value="107">سورة الكوثر</option>\
            <option value="108">سورة الكافرون</option>\
            <option value="109">سورة النصر</option>\
            <option value="110">سورة المسد</option>\
            <option value="111">سورة الإخلاص</option>\
            <option value="112">سورة الفلق</option>\
            <option value="113">سورة النّاس</option>\
          </select>\
        </div>\
        <div class="form-group">\
          <label for="amountOfRevision">مقدار المراجعة لكل واجب:</label>\
          <input class="form-control" id="amountOfRevision" type="number" name="amountOfRevision'+counter+'" required placeholder=" ادخل عدد الاسطر (مثال: 14)" />\
        </div>\
      </div>\
    </div>\
    <div class="row">\
    <div class="col-12 col-md-6">\
                  <div class="form-check form-check-inline">\
                    <input\
                      class="form-check-input"\
                      type="radio"\
                      name="typeOfSaving'+counter+'"\
                      id="inlineRadio3"\
                      value="0"\
                      checked\
                    />\
                    <label class="form-check-label" for="inlineRadio1"\
                      >بداية الحفظ من سورة الناس</label\
                    >\
                  </div>\
                  <div class="form-check form-check-inline">\
                    <input\
                      class="form-check-input"\
                      type="radio"\
                      name="typeOfSaving'+counter+'"\
                      id="inlineRadio4"\
                      value="1"\
                    />\
                    <label class="form-check-label" for="inlineRadio2"\
                      >بداية الحفظ من سورة البقرة</label\
                    >\
                  </div>\
                </div>\
                <div class="col-12 col-md-6">\
                  <div class="form-check form-check-inline">\
                    <input\
                      class="form-check-input"\
                      type="radio"\
                      name="startOfRevision'+counter+'"\
                      id="inlineRadio5"\
                      value="0"\
                      checked\
                    />\
                    <label class="form-check-label" for="inlineRadio1"\
                      >بداية المراجعة من سورة البقرة</label\
                    >\
                  </div>\
                  <div class="form-check form-check-inline">\
                    <input\
                      class="form-check-input"\
                      type="radio"\
                      name="startOfRevision'+counter+'"\
                      id="inlineRadio6"\
                      value="1"\
                    />\
                    <label class="form-check-label" for="inlineRadio2"\
                      >بداية المراجعة من سورة الناس</label\
                    >\
                  </div>\
                </div>\
                <div class="col-12 col-md-6"></div>\
      <div class="col-12 col-md-6">\
      <div class="form-check form-check-inline">\
      <input class="form-check-input" type="radio" name="typeOfRevision'+counter+'" id="inlineRadio1" value="0" checked>\
      <label class="form-check-label" for="inlineRadio1">مقدار المراجعة بعدد السطور</label>\
    </div>\
    <div class="form-check form-check-inline">\
      <input class="form-check-input" type="radio" name="typeOfRevision'+counter+'" id="inlineRadio2" value="1">\
      <label class="form-check-label" for="inlineRadio2">مقدار المراجعة بعدد السور</label>\
    </div>\
      </div>\
    </div>\
  </div>'
    div.innerHTML = html;
    document.getElementById('form').append(div)
}

function removeStudent(){
    if(counter>1){
        document.getElementById('student'+counter+'').remove();
        counter--;
    }
}