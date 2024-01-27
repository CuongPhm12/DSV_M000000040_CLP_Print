$("#header-addrow").unbind("click");
$("#header-addrow").on("click", function () {
  grid1.appendRow();
});

$("#header-delrow").unbind("click");
$("#header-delrow").click(function (ev) {
  grid1.removeCheckedRows();
});
callDetailData();
$("#SAVE_AFTER_JS, #EDIT_AFTER_JS, #DELETE_AFTER_JS").change(function () {
  if ($(this).val() == "Y") {
    $(this).val("N");
    $("#search_btn").trigger("click");
  }
});

$("#CUSTOM1_AFTER_JS").change(function () {
  if ($(this).val() == "Y") {
    $(this).val("N");

    var gd1 = grid1.getCheckedRows();
    var item = gd1[0];

    $("#DUMMY19").val(grid1.getValue(item.rowKey, itmobj1["master_no"]));
    $("#search_btn").trigger("click");
  }
});

$("#printSel_Save")
  .parent()
  .append('<button class="menuadd-btn" id="pdf_create">PDF생성</button>');

$("#search_btn").trigger("click");
$("#save_btn").hide();
$("#cust_btn2").on("click", function () {
  var gd1 = grid1.getCheckedRows();

  //console.log(gd1[0][itmobj1["master_no"]]);
  if (gd1.length == 1) {
    $("#DUMMY1").val(gd1[0][itmobj1["master_no"]]);
    //$("#DUMMY2").val("");
  }
});

// $("#cust_btn5").on("click", function() {
//     //var group_case = "#" + itmobj1["group_case"];
//     var group_case = nvl($("#" + itmobj1["group_case_ser"]).val(), "");

//     if(group_case == "T1"){
//       $("#cust_btn6").trigger("click");
//     };
//     if(group_case == "T2"){
//         $("#cust_btn7").trigger("click");
//     };
//     if(group_case == "T3"){
//         $("#cust_btn8").trigger("click");
//     };
// });

$("#cust_btn5").on("click", function () {
  //var group_case = "#" + itmobj1["group_case"];
  var group_case = nvl($("#" + itmobj1["group_case_ser"]).val(), "");

  var gd1 = grid1.getCheckedRows();
  for (var i = 0; i < gd1.length; i++) {
    var item = gd1[i];

    grid1.setValue(item.rowKey, itmobj1["master_group_no"], group_case);
  }

  $("#cust_btn6").trigger("click");
});

function callDetailData() {
  // 로딩 표시
  if ($("#LOADYN").val() == "Y") {
    $.isLoading({
      tpl: '<span class="isloading-wrapper %wrapper%"><div class="loadingio-spinner-ellipsis-bus78131cg"><div class="ldio-8a4hfl22cb6"><div></div><div></div><div></div><div></div><div></div></div></div></span>',
    });
  }

  setTimeout(function () {
    var data = {};
    data.LANGTYPE = "KR";
    data.SYSTEMCODE = "X000000001";
    data.MENUCODE = "M000000044";
    data.UID = $("#UID").val();

    var dataArr = [];

    //dataArr.push({id: "ITEM000014025", name: "start_ym_ser", value:  $("#" + itmobj1["start_ym2_ser"]).val()});
    //dataArr.push({id: "ITEM000014026", name: "end_ym_ser", value:  $("#" + itmobj1["end_ym2_ser"]).val()});
    //dataArr.push({id: "ITEM000014027", name: "start_port_ser", value: $("#" + itmobj1["start_port2_ser"]).val()});

    //var ship_plan_id_ser = ",";

    //var gd1 = grid1.getCheckedRows();
    // var gd1 = grid1_1.getRows();
    // for(var i=0; i<gd1.length; i++) {
    //     var item = gd1[i];
    //   //  ship_plan_id_ser = ship_plan_id_ser + item[itmobj1["search_ym"]] + ",";
    // }

    //console.log(data);

    dataArr.push({ id: "ITEM000000875", name: "store_id", value: "" });
    dataArr.push({ id: "ITEM000000876", name: "hawb_no", value: "" });
    dataArr.push({ id: "ITEM000000877", name: "invoice_no", value: "" });
    dataArr.push({ id: "ITEM000000878", name: "po_no", value: "" });
    dataArr.push({ id: "ITEM000000879", name: "group_no", value: "" });
    dataArr.push({ id: "ITEM000000880", name: "store_status", value: "" });
    dataArr.push({ id: "ITEM000000881", name: "store_date", value: "" });
    dataArr.push({ id: "ITEM000000882", name: "stock_status", value: "" });
    dataArr.push({ id: "ITEM000000883", name: "shipper", value: "" });
    dataArr.push({ id: "ITEM000000884", name: "consignee", value: "" });
    dataArr.push({ id: "ITEM000000885", name: "destination", value: "" });
    dataArr.push({ id: "ITEM000000886", name: "total_qty", value: "" });
    dataArr.push({ id: "ITEM000000887", name: "total_weight", value: "" });
    dataArr.push({ id: "ITEM000000888", name: "volume", value: "" });
    dataArr.push({ id: "ITEM000000889", name: "charge_weight", value: "" });
    dataArr.push({ id: "ITEM000000890", name: "dom_transport", value: "" });
    dataArr.push({
      id: "ITEM000000891",
      name: "dom_transport_date",
      value: "",
    });
    dataArr.push({ id: "ITEM000000892", name: "customsparty", value: "" });
    dataArr.push({ id: "ITEM000000893", name: "shipment", value: "" });
    dataArr.push({
      id: "ITEM000000894",
      name: "shipping_mark_level",
      value: "",
    });
    dataArr.push({ id: "ITEM000000895", name: "dsv_contact", value: "" });
    dataArr.push({ id: "ITEM000000896", name: "notes", value: "" });
    dataArr.push({ id: "ITEM000000897", name: "release_date", value: "" });
    dataArr.push({ id: "ITEM000000898", name: "charge_weight", value: "" });
    dataArr.push({ id: "ITEM000000899", name: "volume_weight", value: "" });

    var postdata = "data=" + encodeURIComponent(JSON.stringify(data));
    postdata += "&dataArr=" + encodeURIComponent(JSON.stringify(dataArr));
    postdata += "&LANGTYPE=" + $("#lang").val();
    postdata += "&MAXCNT=20000";
    var url = "/MARIADB/simbizSelect.do";
    $.ajax({
      type: "post",
      url: url,
      data: postdata,
      async: false,
      success: function (response, status, request) {
        var ERROR = deConvertSystemSourcetoHtml(
          decodeURIComponent(response)
        ).substring(0, 5);
        if (response != null && ERROR != "ERROR") {
          var itemList = JSON.parse(
            deConvertSystemSourcetoHtml(decodeURIComponent(response))
          );
          var gridList1_1 = [];

          for (var i = 0; i < itemList.length; i++) {
            var obj = {};
            var item = itemList[i];

            //console.log(item);

            obj[itmobj2["store_id"]] = item["ITEM000000875"]; // API 메뉴에있는 동일한 칼럼의 항목 코드
            obj[itmobj2["hawb_no"]] = item["ITEM000000876"];
            obj[itmobj2["invoice_no"]] = item["ITEM000000877"];
            obj[itmobj2["po_no"]] = item["ITEM000000878"];
            obj[itmobj2["group_no"]] = item["ITEM000000879"];
            obj[itmobj2["store_status"]] = item["ITEM000000880"];
            obj[itmobj2["store_date"]] = item["ITEM000000881"];
            obj[itmobj2["stock_status"]] = item["ITEM000000882"];
            obj[itmobj2["shipper"]] = item["ITEM000000883"];
            obj[itmobj2["consignee"]] = item["ITEM000000884"];
            obj[itmobj2["destination"]] = item["ITEM000000885"];
            obj[itmobj2["total_qty"]] = item["ITEM000000886"];
            obj[itmobj2["total_weight"]] = item["ITEM000000887"];
            obj[itmobj2["volume"]] = item["ITEM000000888"];
            obj[itmobj2["charge_weight"]] = item["ITEM000000889"];
            obj[itmobj2["dom_transport"]] = item["ITEM000000890"];
            obj[itmobj2["dom_transport_date"]] = item["ITEM000000891"];
            obj[itmobj2["customsparty"]] = item["ITEM000000892"];
            obj[itmobj2["shipment"]] = item["ITEM000000893"];
            obj[itmobj2["shipping_mark_level"]] = item["ITEM000000894"];
            obj[itmobj2["dsv_contact"]] = item["ITEM000000895"];
            obj[itmobj2["notes"]] = item["ITEM000000896"];
            obj[itmobj2["release_date"]] = item["ITEM000000897"];
            obj[itmobj2["charge_weight"]] = item["ITEM000000898"];
            obj[itmobj2["volume_weight"]] = item["ITEM000000899"];

            gridList1_1.push(obj);
          }
          grid1_1.setData(gridList1_1);
        } else {
          //console.log(response);
        }

        //var gd1 = grid1_1.getRows();

        if ($("#LOADYN").val() == "Y") {
          $.isLoading("hide");
        }
      },
      error: function (xmlHttpRequest, txtStatus, errorThrown) {
        if ($("#LOADYN").val() == "Y") {
          $.isLoading("hide");
        }
      },
    });
  }, 10);
}

grid1.on("click", function (e) {
  var gd1 = grid1.getCheckedRows();

  if (gd1.length == 1) {
    var rowKey = e.rowKey;
    var master_no = grid1.getValue(rowKey, itmobj1["master_no"]);
    //print cuong add 2024-01-26
    sessionStorage.setItem("40_menu_master_no", master_no);

    callSDetailData(master_no);
  }
});

function callSDetailData(master_no) {
  // 로딩 표시
  if ($("#LOADYN").val() == "Y") {
    $.isLoading({
      tpl: '<span class="isloading-wrapper %wrapper%"><div class="loadingio-spinner-ellipsis-bus78131cg"><div class="ldio-8a4hfl22cb6"><div></div><div></div><div></div><div></div><div></div></div></div></span>',
    });
  }

  setTimeout(function () {
    var data = {};
    data.LANGTYPE = "KR";
    data.SYSTEMCODE = "X000000001";
    data.MENUCODE = "M000000048";
    data.UID = $("#UID").val();
    var dataArr = [];

    //dataArr.push({id: "ITEM000014025", name: "start_ym_ser", value:  $("#" + itmobj1["start_ym2_ser"]).val()});
    //dataArr.push({id: "ITEM000014026", name: "end_ym_ser", value:  $("#" + itmobj1["end_ym2_ser"]).val()});
    //dataArr.push({id: "ITEM000014027", name: "start_port_ser", value: $("#" + itmobj1["start_port2_ser"]).val()});

    //var ship_plan_id_ser = ",";

    //var gd1 = grid1.getCheckedRows();
    // var gd1 = grid1_1.getRows();
    // for(var i=0; i<gd1.length; i++) {
    //     var item = gd1[i];
    //   //  ship_plan_id_ser = ship_plan_id_ser + item[itmobj1["search_ym"]] + ",";
    // }

    //console.log(data);

    dataArr.push({ id: "ITEM000000959", name: "store_id", value: "" });
    dataArr.push({ id: "ITEM000000960", name: "master_no", value: master_no });
    dataArr.push({ id: "ITEM000000961", name: "hawb_no", value: "" });
    dataArr.push({ id: "ITEM000000962", name: "invoice_no", value: "" });
    dataArr.push({ id: "ITEM000000963", name: "po_no", value: "" });
    dataArr.push({ id: "ITEM000000964", name: "group_no", value: "" });
    dataArr.push({ id: "ITEM000000965", name: "store_status", value: "" });
    dataArr.push({ id: "ITEM000000966", name: "store_date", value: "" });
    dataArr.push({ id: "ITEM000000967", name: "stock_status", value: "" });
    dataArr.push({ id: "ITEM000000968", name: "shipper", value: "" });
    dataArr.push({ id: "ITEM000000969", name: "consignee", value: "" });
    dataArr.push({ id: "ITEM000000970", name: "destination", value: "" });
    dataArr.push({ id: "ITEM000000971", name: "total_qty", value: "" });
    dataArr.push({ id: "ITEM000000972", name: "total_weight", value: "" });
    dataArr.push({ id: "ITEM000000973", name: "volume", value: "" });
    dataArr.push({ id: "ITEM000000974", name: "charge_weight", value: "" });
    dataArr.push({ id: "ITEM000000975", name: "dom_transport", value: "" });
    dataArr.push({
      id: "ITEM000000976",
      name: "dom_transport_date",
      value: "",
    });
    dataArr.push({ id: "ITEM000000977", name: "customsparty", value: "" });
    dataArr.push({ id: "ITEM000000978", name: "shipment", value: "" });
    dataArr.push({
      id: "ITEM000000979",
      name: "shipping_mark_level",
      value: "",
    });
    dataArr.push({ id: "ITEM000000980", name: "dsv_contact", value: "" });
    dataArr.push({ id: "ITEM000000981", name: "notes", value: "" });
    dataArr.push({ id: "ITEM000000982", name: "volume_weight", value: "" });

    var postdata = "data=" + encodeURIComponent(JSON.stringify(data));
    postdata += "&dataArr=" + encodeURIComponent(JSON.stringify(dataArr));
    postdata += "&LANGTYPE=" + $("#lang").val();
    postdata += "&MAXCNT=20000";
    var url = "/MARIADB/simbizSelect.do";
    $.ajax({
      type: "post",
      url: url,
      data: postdata,
      async: false,
      success: function (response, status, request) {
        var ERROR = deConvertSystemSourcetoHtml(
          decodeURIComponent(response)
        ).substring(0, 5);
        if (response != null && ERROR != "ERROR") {
          var itemList = JSON.parse(
            deConvertSystemSourcetoHtml(decodeURIComponent(response))
          );
          var gridList1_2 = [];

          for (var i = 0; i < itemList.length; i++) {
            var obj = {};
            var item = itemList[i];

            console.log(item);

            obj[itmobj3["store_id"]] = item["ITEM000000959"]; // API 메뉴에있는 동일한 칼럼의 항목 코드
            obj[itmobj3["master_no"]] = item["ITEM000000960"];
            obj[itmobj3["hawb_no"]] = item["ITEM000000961"];
            obj[itmobj3["invoice_no"]] = item["ITEM000000962"];
            obj[itmobj3["po_no"]] = item["ITEM000000963"];
            obj[itmobj3["group_no"]] = item["ITEM000000964"];
            obj[itmobj3["store_status"]] = item["ITEM000000965"];
            obj[itmobj3["store_date"]] = item["ITEM000000966"];
            obj[itmobj3["stock_status"]] = item["ITEM000000967"];
            obj[itmobj3["shipper"]] = item["ITEM000000968"];
            obj[itmobj3["consignee"]] = item["ITEM000000969"];
            obj[itmobj3["destination"]] = item["ITEM000000970"];
            obj[itmobj3["total_qty"]] = item["ITEM000000971"];
            obj[itmobj3["total_weight"]] = item["ITEM000000972"];
            obj[itmobj3["volume"]] = item["ITEM000000973"];
            obj[itmobj3["charge_weight"]] = item["ITEM000000974"];
            obj[itmobj3["dom_transport"]] = item["ITEM000000975"];
            obj[itmobj3["dom_transport_date"]] = item["ITEM000000976"];
            obj[itmobj3["customsparty"]] = item["ITEM000000977"];
            obj[itmobj3["shipment"]] = item["ITEM000000978"];
            obj[itmobj3["shipping_mark_level"]] = item["ITEM000000979"];
            obj[itmobj3["dsv_contact"]] = item["ITEM000000980"];
            obj[itmobj3["notes"]] = item["ITEM000000981"];
            obj[itmobj3["volume_weight"]] = item["ITEM000000982"];

            gridList1_2.push(obj);
          }
          console.log(gridList1_2);
          grid1_2.setData(gridList1_2);
        } else {
          //console.log(response);
        }

        //var gd1 = grid1_1.getRows();

        if ($("#LOADYN").val() == "Y") {
          $.isLoading("hide");
        }
      },
      error: function (xmlHttpRequest, txtStatus, errorThrown) {
        if ($("#LOADYN").val() == "Y") {
          $.isLoading("hide");
        }
      },
    });
  }, 10);
}

$("#pdf_create").click(function () {
  var gd1ck = grid1.getCheckedRows();
  var master_no = gd1ck[0][itmobj1["master_no"]];

  var htmltext = $("#grid_Print_view").html();
  var data = {};
  data.filename = master_no;
  data.htmlStr = encodeURIComponent(htmltext);

  $.ajax({
    type: "post",
    url: "/setCreatePDF.do",
    data: data,
    async: false,
    success: function (response, status, request) {
      var pdf = "/file/" + response + ".pdf";
      // var gd1 = grid1.getCheckedRows();
      // for(var i=0; i<gd1.length; i++) {
      //     var item = gd1[i];

      //     grid1.setValue(item.rowKey, itmobj1["clp_print_picture"], pdf);
      // }
      $("#printSelModal").dialog("destroy");
      saveData(master_no, pdf);
    },
  });
});

function saveData(master_no, pdf) {
  var data = {};
  data.UID = $("#UID").val(); // 저장하는 사용자 ID
  data.master_no = master_no;
  data.pdf = pdf;
  data.menucode = "M000000040"; // 메뉴코드 (JSP 파일명)
  data.type = "cust_btn7"; // 버튼 ID
  console.log(data);
  $.ajax({
    type: "POST",
    url: "./ajax.do",
    data: data,
    dataType: "json",
    success: function (response, status, request) {
      if (response.status == 200) {
        if ($("#msgconfirm").is(":visible")) {
          $("#msgconfirm").dialog("destroy");
        }
        if ($("#LOADYN").val() == "Y") {
          $.isLoading("hide");
        }
        console.log("success", "저장이 완료되었습니다.");
      }
    },
    error: function (xmlHttpRequest, txtStatus, errorThrown) {
      // 저장 실패 시
      if ($("#msgconfirm").is(":visible")) {
        $("#msgconfirm").dialog("destroy");
      }
      if ($("#LOADYN").val() == "Y") {
        $.isLoading("hide");
      }
      console.log("error", "오류가 발생했습니다. 관리자에게 문의해 주십시오.");
      //$(".header_valid_content_mb").html(`<span style="color: red">오류가 발생했습니다. 관리자에게 문의해 주십시오.</span>`)
    },
  });
}
