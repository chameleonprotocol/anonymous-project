var url = 'https://tron.clp.dog/api.html';
var maincontractid = 'TMK7KRF5PBNjwZg3wX7qa8iHFRvdjvTnbv';//'TQn9Y2khEsLJW1ChVWFMSMeRDow5KcbLSE';//
var usdtcontractid = "TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t";
var mainacount = "TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t";
var clptokenid = "TXnCQGCDg5z2D6DgkQ8wrf69gtEX1Wneer"
localStorage.systemerror = "0"
var mainwei = 6;
var usdtnwei = 6;

var mainaddress = '0x41aBfFD4895916eE6991257A136c43112b440cfC';

localStorage.removeItem('Cashdropdown');
localStorage.mainchainId = "_";
localStorage.mainchainIdtext = 'TRX';
localStorage.removeItem('wallet');
localStorage.removeItem('blockNumber');
localStorage.packapprovaldata = "0";
localStorage.depositmoneydata = '0';


var chainApi = "https://api.trongrid.io/wallet/triggerconstantcontract";
var pendingnum = 0;
var uuid = function () {
  function S4() {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  }
  function NewGuid() {
    return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
  }
  // f33260ea-8071-4805-ae33-4394a8138015 
  return NewGuid();
};


String.prototype.trim = function () {
  var str = this, str = str.replace(/^\s\s*/, ''), ws = /\s/, i = str.length;
  while (ws.test(str.charAt(--i)));
  return str.slice(0, i + 1);
}
var msglist = [];
Date.prototype.Format = function (fmt) {
  var o = {
    "M+": this.getMonth() + 1,
    "d+": this.getDate(),
    "h+": this.getHours(),
    "m+": this.getMinutes(),
    "s+": this.getSeconds(),
    "q+": Math.floor((this.getMonth() + 3) / 3),
    "S": this.getMilliseconds()
  };
  if (/(y+)/.test(fmt))
    fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
  for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
  return fmt;
}
var SystemMsg = function () {
  return {
    msg: function (body, title) {
      $('#modal-title').html(title || 'Tips');
      $('#modal-body').html(body || "<p>is working</p>");
      $('#hidemsgbutton').click();
    },
    msg1: function (operation, title) {
      switch (title) {
        case 'approve(address,uint256)':
          title = operation = 'Approve';
          break;
        case 'depositEncrypt2encrypt(uint256,bytes32,bytes32,bytes32)':
          title = operation = 'Deposit';
          break;
        case 'payAccessEncrypt2encrypt(bytes32)':
          title = operation = 'Pay Access Encrypt';
          break;
        case 'withdrawBonusEncrypt2encrypt(bytes32)':
          title = operation = 'Withdraw Bonus Encrypt';
          break;
        case 'withdrawEncrypt2encrypt(bytes32)':
          title = operation = 'Withdraw Encrypt';
          break;
        case 'payNewRateEncrypt2encrypt(bytes32)':
          title = operation = 'Pay New Rate Encrypt';
          break;
        case 'getOrderInfoEncrypt2encrypt(bytes32)':
          title = operation = 'Get Order Info';
          break;
        case 'payinquirecard':
          title = operation = 'Approve pay inquire card';
          break;
        case 'payresetratecard':
          title = operation = 'Approve pay resetrate card';
          break;
        default:
          operation = title;
          break;
      }
      $('#msg1loaderfolst').show();
      $('#modal-title1').html(title || 'Tips');
      $('#operationspan').html("<span style='color:blue'>" + operation + "</span>");

      if (document.getElementById('exampleModal1').style.display == "block") {

      } else {
        $('#hidemsgbutton1').click();
      }

    }
  }
}();
var main = function () {
  return {
    init: function (r) {
      $('#maina').click(function () { $('html,body').animate({ scrollTop: ($($(this).attr('href')).offset().top - 20) }, 700); });
      new ClipboardJS('#copypk', {
        text: function (trigger) {
          var str = $('#pkinput').val();
          str = str.trim();
          if (str.length == 64) {
            if (localStorage.copypk == "1") { localStorage.copypk = 0 } else { SystemMsg.msg('Copsy private key success'); }
          }
          else
            SystemMsg.msg('Please regenerate the private key');
          return str;
        }
      });
      $('#Getpk').click(function () {
        if (window.tronWeb.defaultAddress.base58 == undefined || !window.tronWeb.defaultAddress.base58) {
          SystemMsg.msg('Please link the wallet');
          return;
        }
        SystemMsg.msg("The private key is very important. If it is lost, it will lead to financial loss. Please keep the private key properly,Now we have copied the private key to the clipboard for you");
        var pkstr = maintools.randomString(64);
        $('#pkinput').val(pkstr);
        localStorage.pk = 1;
        localStorage.copypk = 1;
        setTimeout(function () { $('#Downloadpk').click(); }, 3000)
      });
      $('#Downloadpk').click(function () {
        if (window.tronWeb.defaultAddress.base58 == undefined || !window.tronWeb.defaultAddress.base58) {
          SystemMsg.msg('Please link the wallet');
          return;
        }
        var time2 = new Date().Format("yyyy-MM-dd hh:mm:ss");
        var tstr = $('#pkinput').val();
        tstr = tstr.trim();
        var str = "wallet address: " + window.tronWeb.defaultAddress.base58 + "\t\n" + "private key: " + tstr + "\t\n" + "create time: " + time2;
        if (str != undefined && str != '' && str.length >= 64) {
          maintools.download("wallet_" + window.tronWeb.defaultAddress.base58 + "_" + time2 + "_privatekey.txt", str);
          setTimeout(function () { $('#copypk').click(); }, 500)
        } else {
          SystemMsg.msg('Please regenerate the private key');
        }
      });
      $('#anonymous').click(function () {
        $('#simple-remove').click();
        $('#maina').click();
      });
      $('.Amountdropdown').click(function () {
        document.getElementById('Cashdropdown').innerText = this.innerText;
        localStorage.Cashdropdown = this.innerText;
        var amount = this.innerText;
        var reg = new RegExp("USDT", "g");
        amount = amount.replace(reg, "");
        var fee = parseInt(amount) * 0.01;
        $("#fee").text(fee);
        $('#feespan').show();
      });
      window.addEventListener('message', function (e) {
        if (e.data.message && e.data.message.action == "tabReply") {
          var tdata = e.data.message;
          try {
            if (tdata.data.node.chain != localStorage.mainchainId) {
              layer.msg("Please switch mainnet wallet");
              document.querySelector('#UserAccount').innerText = "Wrong Network";
              document.querySelector('#getWalleta').style.background = "rgb(255, 104, 113)";
            } else {
              user.getAccount();
            }
          } catch (error) { }
        }
        if (e.data.message && e.data.message.action == "setAccount") { this.location.reload(); }
        if (e.data.message && e.data.message.action == "setNode") { this.location.reload(); }
      })
      maintools.maindata();
      setInterval(function () { maintools.maindata(); }, 60000);
      $('.hideclosebutton').on('click', function () {
        localStorage.systemerror = 0;
        // if (localStorage.pk == 1) {
        //   localStorage.pk = 0;
        //   setTimeout(() => { $('#Downloadpk').click(); }, 500);
        // }
      });

      $('#getWalleta').click(function () { SystemMsg.msg('Please run the wallet plugin'); user.login(); });
      $('#sendbutton').click(function () { SystemMsg.msg('Please run the wallet plugin'); user.login(); });
      $('#typepkbutton').click(function () { SystemMsg.msg('Please run the wallet plugin'); user.login(); });
      $('#payinquirecard').click(function () { SystemMsg.msg('Please run the wallet plugin'); user.login(); });
      $('#payresetratecard').click(function () { SystemMsg.msg('Please run the wallet plugin'); user.login(); });
      $('#Selectbutton').click(function () { SystemMsg.msg('Please run the wallet plugin'); user.login(); });
      $('#approvalbutton').click(function () { SystemMsg.msg('Please run the wallet plugin'); user.login(); });

      var initobj = setInterval(function () {
        if (window.tronWeb && window.tronWeb.defaultAddress.base58) {
          clearInterval(initobj);
          $('#getWalleta').unbind('click');
          $('#sendbutton').unbind('click');
          $('#typepkbutton').unbind('click');
          $('#payinquirecard').unbind('click');
          $('#payresetratecard').unbind('click');
          $('#Selectbutton').unbind('click');
          $('#approvalbutton').unbind('click');

          user.getAccount();
          $('#getWalleta').click(function () { user.login(); });
          $('#approvalbutton').click(function () {
            if (localStorage.packapprovaldata == '0') {
              localStorage.packapprovaldata = "1";
              cyhcloud.packapprovaldata(maincontractid);
            }
          });
          $('#sendbutton').click(function () {
            cyhcloud.depositmoney($("#withdrawaddress").val(), $("#rateaddress").val(), $("#pkinput").val(), localStorage.Cashdropdown);
          });
          $('#payinquirecard').click(function () { cyhcloud.payinquirecard(); });
          $('#payresetratecard').click(function () { cyhcloud.payresetratecard(); });
          $('#Selectbutton').click(function () { cyhcloud.getorderinfo(); });
          $('#typepkbutton').click(function () {
            if ($('input:radio[name=inlineRadioOptions]:checked').val() == "option1") {
              cyhcloud.withdrawcapital();
            } else {
              cyhcloud.withdrawrates();
            }
          });
        }
      }, 500);
    },
  }
}();


var user = function () {
  return {
    singout: function () {
      var tips = "Do you want to log out?";
      var tip1 = "Yes";
      var tip2 = "No";
      layer.confirm(tips, {
        title: '',
        btn: [tip1, tip2]
      }, function (index, layero) {
        document.querySelector('#UserAccount').innerText = 'Connect wallet'
        localStorage.loginout = true;
        $('#getWalleta').unbind("click");
        $('#getWalleta').click(function (params) { user.login(); });
        layer.close(index);
      }, function (index) { });
    },
    login: async function () {
      localStorage.removeItem("wallet");
      SystemMsg.msg('<div style="text-align: center;"><img style="height: 50px;background: #d94fd3;" src="tronlinklogo.png"></div><div style="padding: 10px;margin: 10px;position: relative;width: 0.5em;" class="loaderfolst"></div> <div style="text-align: center;">loading…</div><div style="text-align: center;">Please log in to tronlink wallet to connect</div>  ', 'login');
      var obj = setInterval(function () {
        if (window.tronWeb && window.tronWeb.defaultAddress.base58) {
          clearInterval(obj);
          const account = window.tronWeb.defaultAddress.base58;
          var stg = account;
          var et = stg.substring(0, 6) + "..." + stg.substring((stg.length - 4), stg.length)
          document.querySelector('#UserAccount').innerText = et;
          document.querySelector('#getWalleta').style.background = "#c549be";
          localStorage.loginout = false;
          $('#getWalleta').unbind("click");
          $('#getWalleta').click(function () { user.singout(); });
          // main.init();
          $('#hideclosebutton').click();
        }
      }, 10);
    },
    getAccount: async function () {
      var obj = setInterval(function () {
        if (window.tronWeb && window.tronWeb.defaultAddress.base58) {
          clearInterval(obj);
          if (typeof window.tronWeb == "undefined") { SystemMsg.msg('Please run the wallet plugin'); return; }
          if (window.tronWeb && window.tronWeb.defaultAddress.base58) {
            var account = window.tronWeb.defaultAddress.base58;
            // account = 'TKtkQkqTM4Kv3URBSGw6gpLxAMKUB83fUu'
            var stg = account;
            var et = stg.substring(0, 6) + "..." + stg.substring((stg.length - 4), stg.length)
            document.querySelector('#UserAccount').innerText = et;
            document.querySelector('#getWalleta').style.background = "#c549be";
            localStorage.loginout = false;
            $('#getWalleta').unbind("click");
            $('#getWalleta').click(function () { user.singout(); });
            setInterval(function (params) { contract.triggerSmartContract(); }, 8000);
            setTimeout(() => { contract.triggerSmartContract(); }, 1000);
          } else {
            document.querySelector('#UserAccount').innerText = 'Connect wallet'
          }
        }
      }, 10);
    },
    GetBalance: function (dom) {
      if (window.tronWeb.defaultAddress.base58 == undefined || !window.tronWeb.defaultAddress.base58) { return; }
      $.ajax({
        type: 'POST',
        dataType: "json",
        contentType: "application/json",
        url: chainApi,
        data: '{"jsonrpc":"2.0","method":"eth_getBalance","params":["' + window.tronWeb.defaultAddress.base58 + '", "latest"],"id":1}',
        success: function (data) {
          if (data.result != null) {
            if (data.result == "0x") data.result = 0;
            var d = maintools.toFixedDigit((parseInt(data.result) / 1000000000000000000), 4);
            if (dom != undefined) {
              dom.text(d == false ? "0" : d);
            } else {
              $('#cashbalance').text((d == false ? "0" : d) + localStorage.mainchainIdtext);
            }
          } else {
            //Server.getethbalance();
          }
        }, error: function () {
          Server.getethbalance();
        }
      });
    },
    GetUsdt: function (dom) {
      if (window.tronWeb.defaultAddress.base58 == undefined || !window.tronWeb.defaultAddress.base58) { return; }
      var address = tronWeb.address.toHex(window.tronWeb.defaultAddress.base58)
      address = address.substr(2, address.length - 2)
      var datas = {
        "contract_address": tronWeb.address.toHex(usdtcontractid), //"411a5a32bd07c33cd8d9f4bd158f235613480c7eef",
        "owner_address": tronWeb.address.toHex(window.tronWeb.defaultAddress.base58),//"417e5f4552091a69125d5dfcb7b8c2659029395bdf",
        "function_selector": "getBalance(address,address[])",
        "parameter": "000000000000000000000000" + address + "00000000000000000000000000000000000000000000000000000000000000400000000000000000000000000000000000000000000000000000000000000001000000000000000000000000a614f803b6fd780986a42c78ec9c7f77e6ded13c"
      };
      var str = JSON.stringify(datas);
      $.ajax({
        type: 'POST',
        dataType: "json",
        contentType: "application/json",
        url: chainApi,
        data: str,// '{"id":1,"jsonrpc":"2.0","method":"eth_call","params":[{"to":"' + maincontractid + '","data":"0x70a08231000000000000000000000000' + window.tronWeb.defaultAddress.base58.replace('0x', '') + '"},"' + localStorage.blockNumber + '"]}',
        // '{"jsonrpc":"2.0","method":"eth_getBalance","params":["' + window.tronWeb.defaultAddress.base58 + '", "latest"],"id":1}',
        success: function (data) {
          if (data.result != null) {
            console.log(data);
            if (data.result == "0x") data.result = 0;
            var d = maintools.toFixedDigit((parseInt(data.result) / parseInt("1" + maintools.getdec(usdtnwei))), 3);
            if (dom != undefined) {
              dom.text(d == false ? "0" : d);
            } else {
              $('#cashbalance').text((d == false ? "0" : d) + "USDT");
            }
          } else {
            //Server.getethbalance();
          }
        }, error: function () {
          // Server.getethbalance();
        }
      });
    },
  }
}();
var err = function (a, result, title) {
  console.log('err_' + a)
  console.log(result);
  $('#tronlinklogo').attr('src', 'err.png');
  $('#msg1loaderfolst').hide();
  $('#restspan').show();
  $('#restspan').html("<span style='color: red;'>" + result + "</span>");
  typeselect(title);
}
var exmsg = function (title) {
  $('#tronlinklogo').attr('src', 'tronlinklogo.png');
  $('#msg1loaderfolst').show();
  $('#restspan').hide();
  $('#modal-title1').html(title);
  $('#operationspan').html("<span style='color: blue;'>" + title + "</span>");
}
var typeselect = function (title) {
  if (title === 'approve(address,uint256)') {
    localStorage.packapprovaldata = "0";
    localStorage.depositmoneydata = "0";
  }
  if (title === 'depositEncrypt2encrypt(uint256,bytes32,bytes32,bytes32)') {
    localStorage.packapprovaldata = "0";
    localStorage.depositmoneydata = "0";
  }
}
var resolved = function (result, a, txid, i, title) {
  console.log("==================================" + a + "==================================" + i)
  console.log(result, title)
  $('#meetingspan').html(i ?? 1);
  if (a === 0) {
    $('#tronlinklogo').attr('src', 'tronlinklogo.png');
    SystemMsg.msg1(result[1], title);
    $('#restspan').hide();
    $('#restspan').html('');
    if (title == "getOrderInfoEncrypt2encrypt(bytes32)") {
      var a1 = tronWeb.transactionBuilder.triggerConstantContract(result[0], result[1], {}, result[2]);
      a1.then(result => resolved(result, 3, 0, 0, title))
      a1.catch(result => err(1, result, title))
    } else {
      var a1 = tronWeb.transactionBuilder.triggerSmartContract(result[0], result[1], Object.assign({ feeLimit: 5e7 }, {}), result[2]);
      a1.then(result => resolved(result, 1, 0, 0, title))
      a1.catch(result => err(1, result, title))
    }
  }
  if (a === 1) {
    var a2 = tronWeb.trx.sign(result.transaction)
    a2.then(result => resolved(result, 2, 0, 0, title))
    a2.catch(result => err(2, result, title))
  }
  if (a === 2) {
    var a3 = tronWeb.trx.sendRawTransaction(result)
    a3.then(result => resolved(result, 3, result.txid, 1, title))
    a3.catch(result => err(3, result, title))
  }
  if (a === 3) {
    if (result.receipt && typeof result.receipt.result === "string") {
      setTimeout(() => { resolved(result, 4, 0, 0, title) }, 3000);
      return 0
    }
    if (title == "getOrderInfoEncrypt2encrypt(bytes32)" && typeof result.result.result == 'boolean') {
      setTimeout(() => { resolved(result, 4, 0, 0, title) }, 3000);
      return 0
    }
    // if (i > 30) {
    //   setTimeout(() => { resolved("err_", 4, 0, 0, title) }, 3000);
    //   return 0
    // }
    i = i + 1;
    var a4 = tronWeb.trx.getTransactionInfo(txid)
    a4.then(result => { setTimeout(() => { resolved(result, 3, txid, i, title) }, 3000); })
    a4.catch(result => err(3, result.receipt.result, title))
  }
  if (a === 4) {
    $('#restspan').show();
    if (result === "err_") {
      err(4, 'Wait timeout');
    }
    else if (title === 'approve(address,uint256)' && result.receipt.result === "SUCCESS") {
      $('#approvalbutton').hide();
      $('#approvali').hide();
      $('#sendi').hide();
      $('#sendbutton').show();
      $('#hideclosebutton1').click();
    }
    else if (title === 'payresetratecard' && result.receipt.result === "SUCCESS") {

      $('#hideclosebutton1').click();
      var tip1 = "Yes";
      var tip2 = "No";
      layer.prompt({
        formType: 2,
        btn: [tip1, tip2],
        title: 'Enter private key to buy resetrate card',
        value: '',
        area: ['260px', '100px']
      }, function (value, index, elem) {
        var private_key = value;
        private_key = private_key.trim();
        layer.close(index);
        if (!private_key || private_key == "" || private_key == undefined) { SystemMsg.msg("Please generate private key"); return; }
        if (private_key.length != 64) { SystemMsg.msg("Please check the private key length"); return; }
        maintools.postmethod("payresetratecard", "&private_key=" + private_key, true, function (params) {
        }, maintools.posterror, maintools.postbeforeSend, maintools.postcomplete, false);
      });
    }
    else if (title === 'payinquirecard' && result.receipt.result === "SUCCESS") {
      $('#hideclosebutton1').click();
      var tip1 = "Yes";
      var tip2 = "No";
      layer.prompt({
        formType: 2,
        btn: [tip1, tip2],
        title: 'Enter private key to buy inquire card',
        value: '',
        area: ['260px', '100px']
      }, function (value, index, elem) {
        var private_key = value;
        private_key = private_key.trim();
        layer.close(index);
        if (!private_key || private_key == "" || private_key == undefined) { SystemMsg.msg("Please generate private key"); return; }
        if (private_key.length != 64) { SystemMsg.msg("Please check the private key length"); return; }
        maintools.postmethod("payinquirecard", "&private_key=" + private_key, true, function (params) {
        }, maintools.posterror, maintools.postbeforeSend, maintools.postcomplete, false);
      });

    }
    else if (title === 'depositEncrypt2encrypt(uint256,bytes32,bytes32,bytes32)' && result.receipt.result === "SUCCESS") {
      $('#approvalbutton').hide();
      $('#approvali').hide();
      $('#sendi').hide();
      $('#sendbutton').show();
      $('#msg1loaderfolst').hide();
      $('#restspan').html("Deposit " + localStorage.Cashdropdown + " success");
      $('#pkinput').val('');
    }
    else if (title === 'payAccessEncrypt2encrypt(bytes32)' && result.receipt.result === "SUCCESS") {
      $('#msg1loaderfolst').hide();
      $('#restspan').html("Pay AccessEncrypt success");
    }
    else if (title === 'payNewRateEncrypt2encrypt(uint256)' && result.receipt.result === "SUCCESS") {
      $('#msg1loaderfolst').hide();
      $('#restspan').html("Pay New RateEncrypt success");
    }
    else if (title === 'withdrawBonusEncrypt2encrypt(bytes32)' && result.receipt.result === "SUCCESS") {
      $('#msg1loaderfolst').hide();
      $('#restspan').html("Withdraw BonusEncrypt success");
    }
    else if (title === 'withdrawEncrypt2encrypt(bytes32)' && result.receipt.result === "SUCCESS") {
      $('#msg1loaderfolst').hide();
      $('#restspan').html("Withdraw Encrypt success");
    }
    else if (title === "getOrderInfoEncrypt2encrypt(bytes32)") {
      console.log("getOrderInfoEncrypt2encrypt:result=>", result);
      if (result.result.result) {
        var s = result.constant_result[0];
        if (s.length == 448) {
          var message = {
            Remainingamount: maintools.hex2int(s.substring(0, 64)),
            orderamount: maintools.hex2int(s.substring(64, 64 * 2)),
            OrderTime: maintools.hex2int(s.substring(64 * 2, 64 * 3)),
            Interestamount: maintools.hex2int(s.substring(64 * 3, 64 * 4)),
            Interestrate: parseInt(maintools.hex2int(s.substring(64 * 4, 64 * 5))) / 100,
            type: maintools.hex2int(s.substring(64 * 5, 64 * 6)),
            Resettimes: maintools.hex2int(s.substring(64 * 6, 64 * 7)),
          }
          var orderamount = maintools.toFixedDigit((parseInt(message.orderamount) / parseInt("1" + maintools.getdec(usdtnwei))), 3);
          var Interestamount = maintools.toFixedDigit((parseInt(message.Interestamount) / parseInt("1" + maintools.getdec(usdtnwei))), 3);
          var Remainingamount = maintools.toFixedDigit((parseInt(message.Remainingamount) / parseInt("1" + maintools.getdec(usdtnwei))), 3);
          $('#Interestspan').text(Interestamount.toLocaleString());
          $('#orderamountspan').text(orderamount.toLocaleString());
          console.log(Remainingamount);
          $('#Remainingamount').text(Remainingamount.toLocaleString());
          $('#deposittimespan').text(maintools.formatDate(parseInt(message.OrderTime) * 1000));
          switch (message.type) {
            case 0:
              $('#orderstatusspan').text("non-existent");
              break;
            case 1:
              $('#orderstatusspan').text("effective");
              break;
            case 2:
              $('#orderstatusspan').text("extracted capital");
              break;
            case 3:
              $('#orderstatusspan').text("extracted interest");
              break;
          }
          $('#ratespan').show();
          $('#ratespan').text(message.Interestrate + "%");
          if (message.Interestrate != 0) {
            $('#ratebutton').hide();
          }
          else {
            // $('#ratebutton').show();
            // $('#ratespan').hide();
          }
          $('#resettimesspan').text(message.Resettimes);
        }
        $('#hideclosebutton1').click();
        $('#orderinfodiv').show();
      } else {
        SystemMsg.msg("Order does not exist or private key error");
      }
    }
    else if (title === 'depositEncrypt2encrypt(uint256,bytes32,bytes32,bytes32)' && result.result === "FAILED") {
      err(4, "Deposit " + localStorage.Cashdropdown + " fail");
      $('#pkinput').val('');
    }
    else if (title === 'payAccessEncrypt2encrypt(bytes32)' && result.result === "FAILED") {
      err(4, "Pay AccessEncrypt fail");
    }
    else if (title === 'payNewRateEncrypt2encrypt(uint256)' && result.result === "FAILED") {
      err(4, "Pay New RateEncrypt fail");
    }
    else if (title === 'withdrawBonusEncrypt2encrypt(bytes32)' && result.result === "FAILED") {
      err(4, "Withdraw BonusEncrypt fail");
    }
    else if (title === 'withdrawEncrypt2encrypt(bytes32)' && result.result === "FAILED") {
      err(4, "Withdraw Encrypt fail");
    }
    else if (result.result === "FAILED") {
      err(4, tronWeb.toAscii(result.resMessage));
    }
    else {
      $('#restspan').html(result);
    }
    typeselect(title);
    setTimeout(() => { $('#hideclosebutton1').click(); }, 5000);
  }
}
var maintools = function () {
  return {
    ethblockNumber: function () {
      return;
      if (window.location.href.indexOf("Home") == -1) {
        $.ajax({
          type: 'POST',
          dataType: "json",
          contentType: "application/json",
          url: chainApi,
          data: '{"jsonrpc":"2.0","method":"eth_blockNumber","params":[],"id":0}',
          success: function (data) {
            if (data.result != null) {
              localStorage.blockNumber = data.result;
            }
          }
        });
      }
    },
    formatDate: function (date) {
      var date = new Date(date);
      var YY = date.getFullYear() + '-';
      var MM = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
      var DD = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate());
      var hh = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
      var mm = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
      var ss = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());
      return YY + MM + DD + " " + hh + mm + ss;
    },
    postmethod: function (method, params, base64, success, error, beforeSend, complete, async, uint256) {
      if (window.tronWeb.defaultAddress.base58 == undefined || !window.tronWeb.defaultAddress.base58) {
        SystemMsg.msg('Please link the wallet');
        return;
      }
      //  
      $.ajax({
        type: 'POST',
        url: url,
        data: "method=" + method + "&address=" + window.tronWeb.defaultAddress.base58 + params,
        async: async || true,
        cache: false,
        dataType: "json",
        success: function (data) {

          if (base64) {
            if (method == 'getorderinfo') {
              var tparams = JSON.parse(data.message);
              resolved(
                [maincontractid,
                  "getOrderInfoEncrypt2encrypt(bytes32)",
                  [
                    {
                      type: "bytes32",
                      value: tparams.callHash
                    }
                  ]
                ], 0, 0, 0, "getOrderInfoEncrypt2encrypt(bytes32)");
              return;
            } else {
              var jsonstr = $.base64.decode(data.message);
              var tparams = JSON.parse(jsonstr);
              console.log(method + "-api", tparams);
              if (method == 'packapprovaldata') { success(data); return; }
              else if (method == 'depositmoney') {
                resolved(
                  [maincontractid,
                    "depositEncrypt2encrypt(uint256,bytes32,bytes32,bytes32)",
                    [
                      {
                        type: "uint256",
                        value: uint256
                      },
                      {
                        type: "bytes32",
                        value: tparams.withdrawHash
                      },
                      {
                        type: "bytes32",
                        value: tparams.feeHash
                      },
                      {
                        type: "bytes32",
                        value: tparams.callHash
                      }
                    ]
                  ], 0, 0, 0, "depositEncrypt2encrypt(uint256,bytes32,bytes32,bytes32)");

                return;
              }
              else if (method == 'payresetratecard') {
                resolved(
                  [maincontractid,
                    "payNewRateEncrypt2encrypt(bytes32)",
                    [
                      {
                        type: "bytes32",
                        value: tparams.callHash
                      }
                    ]
                  ], 0, 0, 0, "payNewRateEncrypt2encrypt(bytes32)");

                return;
              }
              else if (method == 'payinquirecard') {
                resolved(
                  [maincontractid,
                    "payAccessEncrypt2encrypt(bytes32)",
                    [
                      {
                        type: "bytes32",
                        value: tparams.callHash
                      }
                    ]
                  ], 0, 0, 0, "payAccessEncrypt2encrypt(bytes32)");

                return;
              }
              else if (method == 'withdrawrates') {
                resolved(
                  [maincontractid,
                    "withdrawBonusEncrypt2encrypt(bytes32)",
                    [
                      {
                        type: "bytes32",
                        value: tparams.callHash
                      }
                    ]
                  ], 0, 0, 0, "withdrawBonusEncrypt2encrypt(bytes32)");

                return;
              }
              else if (method == 'withdrawcapital') {
                resolved(
                  [maincontractid,
                    "withdrawEncrypt2encrypt(bytes32)",
                    [
                      {
                        type: "bytes32",
                        value: tparams.callHash
                      }
                    ]
                  ], 0, 0, 0, "withdrawEncrypt2encrypt(bytes32)");

                return;
              } else { }
            }
          } else {
            success(data);
          }
        },
        beforeSend: function () { if (async == false) { if (typeof (beforeSend) == "function") beforeSend(); else { maintools.postbeforeSend() } } },
        complete: function () { if (async == false) { if (typeof (complete) == "function") complete(); else maintools.postcomplete() } },
        error: function (data) { if (async == false) { localStorage.systemerror = "1"; if (typeof (error) == "function") error(data); else maintools.posterror(); } },
      });
    },
    hex2int: function (hex) {
      var len = hex.length, a = new Array(len), code;
      for (var i = 0; i < len; i++) {
        code = hex.charCodeAt(i);
        if (48 <= code && code < 58) {
          code -= 48;
        } else {
          code = (code & 0xdf) - 65 + 10;
        }
        a[i] = code;
      }

      return a.reduce(function (acc, c) {
        acc = 16 * acc + c;
        return acc;
      }, 0);
    },
    randomString: function (len) {
      len = len || 64;
      var $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
      var maxPos = $chars.length;
      var pwd = '';
      for (i = 0; i < len; i++) {
        pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
      }
      return pwd;
    },
    download: function (filename, text) {
      var element = document.createElement('a');
      element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
      element.setAttribute('download', filename);
      element.style.display = 'none';
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
    },
    CompletionAccuracy: function (dec) {
      var str = "";
      for (var i = 0; i < parseInt(dec); i++) { str += "0" }
      return str;
    },
    postbeforeSend: function (params) {
      //
    },
    postcomplete: function (params) {
      if (localStorage.systemerror == "0") {
        setTimeout(() => {
          $('#hideclosebutton').click();
          $('.modal-backdrop .fade').hide();
        }, 6000);
      }
    },
    posterror: function (params) {
      localStorage.systemerror = "1";
      SystemMsg.msg(params || 'The network is busy. Please try again later');
    },
    GettronWebMsg: function (num, txHash, method) {
      //回调
      $("#pendingloader").fadeIn(500);
      $("#pendingloaderdiv").fadeIn(500);
      $.ajax({
        type: 'POST',
        dataType: "json",
        contentType: "application/json",
        url: chainApi,
        data: '{"value":"' + txHash + '" }',
        success: function (data) {
          if (data.ret[0].contractRet == 'SUCCESS') {

          } else {

          }

          if (data.result != null) {
            var NotificationFxstr = "";
            switch (method) {
              case "depositmoney":
                NotificationFxstr = 'deposit';
                break;
              case "packapprovaldata":
                NotificationFxstr = 'approval';
                break;
              case "withdrawrates":
                NotificationFxstr = 'withdraw';
                break;
              case "withdrawcapital":
                NotificationFxstr = 'withdraw';
                break;
              case "payinquirecard":
                NotificationFxstr = 'buy card';
                break;
              case "payresetratecard":
                NotificationFxstr = 'buy card';
                break;
            }
            if (data.result.status == "0x1") {//ok  
              var notification = new NotificationFx({
                message: '<p class="navbar-brand" style="color:#0eada0"><b>' + NotificationFxstr + ' success</b> </p>',
                layout: 'growl',
                effect: 'genie',
                type: 'notice',
                onClose: function () { }
              });
              notification.show();
              if (method == 'packapprovaldata') {
                $('#sendbutton').fadeIn();
                $('#approvali').fadeOut();
                $('#approvalbutton').fadeOut();
              }
              else if (method == 'depositmoney') {
                $('#sendbutton').fadeIn();
                $('#sendi').fadeOut();
                $('#pkinput').val('');
              } else if (method == 'withdrawrates') {
                $('#typepk').val("");
              }
            } else if (data.result.status == "0x2") {//err   
              var notification = new NotificationFx({
                message: '<p class="navbar-brand" style="color:red"><b>' + NotificationFxstr + '  fail</b> </p>',
                layout: 'growl',
                effect: 'genie',
                type: 'warning',
                onClose: function () { }
              });
              notification.show();
            } else if (data.result.status == "0x0") {//err   
              var notification = new NotificationFx({
                message: '<p class="navbar-brand" style="color:red"><b>' + NotificationFxstr + '  fail</b> </p>',
                layout: 'growl',
                effect: 'genie',
                type: 'warning',
                onClose: function () { }
              });
              notification.show();
            } else {
              var notification = new NotificationFx({
                message: '<p class="navbar-brand" style="color:red"><b>' + NotificationFxstr + '  fail</b> </p>',
                layout: 'growl',
                effect: 'genie',
                type: 'warning',
                onClose: function () { }
              });
              notification.show();
            }
            var tindex = -1;
            for (let index = 0; index < msglist.length; index++) {
              const element = msglist[index];
              if (element.msglistlength == num) {
                pendingnum--;
                setTimeout(() => {
                  clearInterval(element.IntervalId);
                }, 300);
              }
            }
            if (tindex != -1) delete msglist[tindex];
          } else {

          }
          if (pendingnum > 0) {
            $('#pendingnum').text(pendingnum);
          } else {
            $('#pendingnum').text(0);
            $("#pendingloader").fadeOut(500);
            $("#pendingloaderdiv").fadeOut(500);
          }
        }
      });
    },
    toFixedDigit: function (num, n) {
      if (typeof num != 'number') { return false; };
      num = num.toString();
      var result = "";
      var zeroResult = function (n) {
        var zero = "";
        for (var i = 0; i < n; i++) { zero += "0"; }
        return zero;
      }
      if (num % 1 == 0) {
        result = num + "." + zeroResult(n);
      } else {
        var num1 = num.split(".");
        if (num1[1].length < n) {
          result = num1[0] + "." + num1[1] + zeroResult(n - num1[1].length)
        } else {
          result = num1[0] + "." + num1[1].substring(0, n)
        }
      }
      return result;
    },
    maindata: function () {
      var str = '418c0f213d9e566369f45df62f68d3f530b7ef4614';
      if (window.tronWeb && window.tronWeb.defaultAddress.base58) str = tronWeb.address.toHex(tronWeb.defaultAddress.base58)
      var str = '{ "contract_address": "417c6cf56393da8621a7d7af77d699d1235ee1c1b5", "owner_address": "' + str + '", "function_selector": "getTotalInfoEncrypt2encrypt()", "parameter": "" }';
      $.ajax({
        type: 'post',
        dataType: "json",
        contentType: "application/json",
        url: chainApi,
        data: str,
        success: function (data) {
          if (data.result.result) {
            var t = data.constant_result[0];
            var tag1 = parseInt(maintools.hex2int(t.substring(0, 64)));
            var tag2 = parseInt(maintools.hex2int(t.substring(64, 64 * 2))) / 1000000;
           // var tag3 = maintools.toFixedDigit(parseFloat(maintools.hex2int(t.substring(64 * 2, 64 * 3))), 1);
            $('#tag1').text(tag1.toLocaleString());
            $('#tag2').text(tag2.toLocaleString());
           // $('#tag3').text(tag3.toLocaleString());
          }
        }
      });

      return;
      $.ajax({
        type: 'post',
        dataType: "json",
        contentType: "application/json",
        url: url,
        data: 'method=getinfo',
        success: function (data) {
          if (data) {
            var t = JSON.parse(data.message);
            var tag1 = parseInt(t.ordertimes);
            var tag2 = parseInt(t.totaldeposits);
            var tag3 = maintools.toFixedDigit(parseFloat(t.totalrevenue), 1);;
            $('#tag1').text(tag1.toLocaleString());
            $('#tag2').text(tag2.toLocaleString());
            $('#tag3').text(tag3.toLocaleString());
          }
        }
      });
    },
    getdec: function (dec) {
      var str = "";
      for (var i = 0; i < parseInt(dec); i++) { str += "0" }
      return str;
    },
  }
}();

var contract = function () {
  return {
    allowance: async function (success) {
      try {
        let contract = await tronWeb.contract().at(maincontractid);
        const value = await contract.allowance(
          maincontractid, //address _owner
          window.tronWeb.defaultAddress.base58  //address _spender
        ).call();
        console.log('- Output:', value, '\n');
        success({ result: { result: true }, constant_result: [tronWeb.toDecimal(value._hex), tronWeb.toDecimal(value._hex)] });
      } catch (error) {
        console.error("allowance error", error);
        $('#sendi').hide();
        $('#sendbutton').show();
        $('#approvalbutton').hide();
        SystemMsg.msg(error.message ?? error);
        localStorage.packapprovaldata = '0';
      }
    },
    approve: async function () {
      $('#approvali').show();
      try {
        let contract = await tronWeb.contract().at(maincontractid);
        await contract.approve(
          window.tronWeb.defaultAddress.base58, //address _spender
          10000000, //amount
        ).send({
          feeLimit: 300000000 //100000000
        }).then(output => {
          console.log('- Output:', output, '\n');
          localStorage.packapprovaldata = '0';
          $('#sendi').hide();
          $('#sendbutton').show();
          $('#approvalbutton').hide();
          $('#approvali').hide();
        });
      } catch (error) {
        console.error("approve error", error);
        $('#approvali').hide();
        SystemMsg.msg(error.message ?? error);
        localStorage.packapprovaldata = '0';
      }
    },
    triggerSmartContract: async function () {
      let contract = await tronWeb.contract().at(usdtcontractid);
      let result = await contract.balanceOf(tronWeb.defaultAddress.base58).call();
      $('#cashbalance').text((tronWeb.toDecimal(result._hex) / 1000000) + 'USDT');
    }
  }
}();

var cyhcloud = function () {
  return {
    depositmoney: function (withdraw_address, rate_address, private_key, amount) {
      private_key = private_key.trim();
      if (!withdraw_address || withdraw_address == "" || withdraw_address == undefined) { SystemMsg.msg("Please fill in the withdraw address"); return; }
      if (withdraw_address.length != mainacount.length) { SystemMsg.msg("Please check the withdraw address length"); return; }
      if (!rate_address || rate_address == "" || rate_address == undefined) { SystemMsg.msg("Please fill in the rate address"); return; }
      if (rate_address.length != mainacount.length) { SystemMsg.msg("Please check the rate address length"); return; }
      if (!private_key || private_key == "" || private_key == undefined) { SystemMsg.msg("Please generate private key"); return; }
      if (private_key.length != 64) { SystemMsg.msg("Please check the private key length"); return; }
      if (!amount || amount == "" || amount == undefined) { SystemMsg.msg("Please select Deposit amount"); return; }


      const s1 = withdraw_address;
      const s2 = rate_address;

      if (withdraw_address.toLowerCase() == rate_address.toLowerCase() || withdraw_address.toLowerCase() == window.tronWeb.defaultAddress.base58.toLowerCase() || rate_address.toLowerCase() == window.tronWeb.defaultAddress.base58.toLowerCase()) {
        SystemMsg.msg("The address cannot be the same"); return;
      }

      var reg = new RegExp("USDT", "g");
      amount = amount.replace(reg, "");
      amount = (amount + maintools.CompletionAccuracy(usdtnwei));
      if (localStorage.depositmoneydata == '0') {
        localStorage.depositmoneydata = "1";
        $('#sendi').show();
        cyhcloud.approvalcheck(usdtcontractid, function (data) {
          if (data.result.result) {
            if (data.constant_result[0] == "0000000000000000000000000000000000000000000000000000000000000000") {
              $('#approvalbutton').show();
              $('#sendi').hide();
              $('#sendbutton').hide();
              localStorage.depositmoneydata == "0";
            } else {
              maintools.postmethod("depositmoney", "&withdraw_address=" + s1 + "&rate_address=" + s2 + "&private_key=" + private_key + "&amount=" + amount, true,
                function (data) {
                  $('#sendi').hide();
                  localStorage.depositmoneydata == "0";
                }, function (params) {
                  $('#sendi').hide();
                  localStorage.depositmoneydata == "0";
                }, maintools.postbeforeSend, function (params) {
                  $('#sendi').hide();
                  localStorage.depositmoneydata == "0";
                }, false, amount);
            }
          }
          else {
            SystemMsg.msg('The request failed. Please try again later');
            $('#sendi').hide();
            $('#sendbutton').show();
            $('#approvalbutton').hide();
            localStorage.depositmoneydata == "0";
          }
        });
      }
    },
    approvalcheck: function (contractid, success) {
      $('#restspan').html('');
      SystemMsg.msg1('approval check', 'approval check');
      maintools.postmethod("approvalcheck", "&contractid=" + contractid, false, function (data) {
        if (data.result == "true") {
          var jsonstr = $.base64.decode(data.message);
          $.ajax({
            type: 'POST',
            dataType: "json",
            contentType: "application/json",
            url: chainApi,
            data: jsonstr,
            success: function (data) {
              success(data);
            }, error: function () { maintools.posterror },
            beforeSend: function () { maintools.postbeforeSend },
            complete: function () { maintools.postcomplete }
          });
        } else {
          exmsg("The request failed. Please try again later");
        }
      }, function () {
        exmsg("The request failed. Please try again later");
      }, maintools.postbeforeSend, maintools.postcomplete, true);
    },
    packapprovaldata: function (contractid) {
      resolved(
        [usdtcontractid,
          "approve(address,uint256)",
          [
            {
              type: "address",
              value: maincontractid
            },
            {
              type: "uint256",
              value: "0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff"
            }
          ]
        ], 0, 0, 0, "approve(address,uint256)");
      // contract.approve(contractid);// gf
      // maintools.postmethod("packapprovaldata", "&contractid=" + contractid, true, function (params) {
      // }, maintools.posterror, maintools.postbeforeSend, maintools.postcomplete, false);
    },
    withdrawcapital: function () {
      private_key = $('#typepk').val();
      private_key = private_key.trim();
      if (!private_key || private_key == "" || private_key == undefined) { SystemMsg.msg("Please generate private key"); return; }
      if (private_key.length != 64) { SystemMsg.msg("Please check the private key length"); return; }

      maintools.postmethod("withdrawcapital", "&private_key=" + private_key, true, function (params) {
        $('#typepk').val("");
      }, maintools.posterror, maintools.postbeforeSend, maintools.postcomplete, false);
    },
    withdrawrates: function () {
      private_key = $('#typepk').val();
      private_key = private_key.trim();
      if (!private_key || private_key == "" || private_key == undefined) { SystemMsg.msg("Please generate private key"); return; }
      if (private_key.length != 64) { SystemMsg.msg("Please check the private key length"); return; }


      maintools.postmethod("withdrawrates", "&private_key=" + private_key, true, function (params) {

      }, maintools.posterror, maintools.postbeforeSend, maintools.postcomplete, false);
    },
    payinquirecard: function () {
      cyhcloud.approvalcheck(clptokenid, function (data) {
        if (data.result.result) {
          console.log("payinquirecardapprovalcheck=>", data);
          if (data.constant_result[0] == "0000000000000000000000000000000000000000000000000000000000000000" || data.constant_result[0] == "") {
            exmsg('approval');
            resolved(
              [clptokenid,
                "approve(address,uint256)",
                [
                  {
                    type: "address",
                    value: maincontractid
                  },
                  {
                    type: "uint256",
                    value: "0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff"
                  }
                ]
              ], 0, 0, 0, "payinquirecard");
          } else {
            $('#hideclosebutton1').click();
            var tip1 = "Yes";
            var tip2 = "No";
            layer.prompt({
              formType: 2,
              btn: [tip1, tip2],
              title: 'Enter private key to buy inquire card',
              value: '',
              area: ['260px', '100px']
            }, function (value, index, elem) {
              var private_key = value;
              private_key = private_key.trim();
              layer.close(index);
              if (!private_key || private_key == "" || private_key == undefined) { SystemMsg.msg("Please generate private key"); return; }
              if (private_key.length != 64) { SystemMsg.msg("Please check the private key length"); return; }
              maintools.postmethod("payinquirecard", "&private_key=" + private_key, true, function (params) {
              }, maintools.posterror, maintools.postbeforeSend, maintools.postcomplete, false);
            });
          }
        }
        else {
          SystemMsg.msg('The request failed. Please try again later');
        }
      });

    },
    payresetratecard: function () {
      cyhcloud.approvalcheck(clptokenid, function (data) {
        console.log("payresetratecardapprovalcheck=>", data);
        if (data.result.result) {
          if (data.constant_result[0] == "0000000000000000000000000000000000000000000000000000000000000000" || data.constant_result[0] == "") {
            exmsg('approval');
            resolved(
              [clptokenid,
                "approve(address,uint256)",
                [
                  {
                    type: "address",
                    value: maincontractid
                  },
                  {
                    type: "uint256",
                    value: "0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff"
                  }
                ]
              ], 0, 0, 0, "payresetratecard");
          } else {
            $('#hideclosebutton1').click();
            var tip1 = "Yes";
            var tip2 = "No";
            layer.prompt({
              formType: 2,
              btn: [tip1, tip2],
              title: 'Enter private key to buy resetrate card',
              value: '',
              area: ['260px', '100px']
            }, function (value, index, elem) {
              var private_key = value;
              private_key = private_key.trim();
              layer.close(index);
              if (!private_key || private_key == "" || private_key == undefined) { SystemMsg.msg("Please generate private key"); return; }
              if (private_key.length != 64) { SystemMsg.msg("Please check the private key length"); return; }
              maintools.postmethod("payresetratecard", "&private_key=" + private_key, true, function (params) {
              }, maintools.posterror, maintools.postbeforeSend, maintools.postcomplete, false);
            });
          }
        }
        else {
          SystemMsg.msg('The request failed. Please try again later');
        }
      });
    },
    getorderinfo: function () {
      var private_key = $('#orderpk').val();
      private_key = private_key.trim();
      if (!private_key || private_key == "" || private_key == undefined) { SystemMsg.msg("Please generate private key"); return; }
      if (private_key.length != 64) { SystemMsg.msg("Please check the private key length"); return; }
      $('#Selecti').fadeIn();
      maintools.postmethod("getorderinfo", "&private_key=" + private_key, true, function (data) {
      }, maintools.posterror, maintools.postbeforeSend, function () {
        $('#Selecti').fadeOut();
      }, false);
    },
  }
}();