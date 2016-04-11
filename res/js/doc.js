(function(window, document, $, undefined) {
  /**
   * 一些全局函数
   */
  // 判断是否根节点
  function isRoot(elem) {
    return elem == document.body || elem == document.documentElement;
  }
  // 获取偏移量
  function getOffset(child, parent) {
    if(!child) return null;
    parent = parent || null;
    var node = child;
    var ret = {x:0, y:0};
    var rootFlag;
    var delta;
    var border;

    while(node && node != parent) {
      rootFlag = isRoot(node) || node == child;
      delta = rootFlag ? 0 : node.scrollLeft;
      border = parseInt($(node).css('borderLeftWidth')) || 0;
      ret.x += node.offsetLeft + border - delta;
      delta = rootFlag ? 0 : node.scrollTop;
      border = parseInt($(node).css('borderTopWidth')) || 0;
      ret.y += node.offsetTop + border - delta;
      node = node.offsetParent;
    }
    return ret;
  }
  // 是否拥有二级标题的一级标题，需传入一级标题里的a
  function isLevel1(node) {
    return $(node).hasClass('j-flag-levone') && $(node).parent().next('ul.nav_levtwo').length
  }
  // 是否二级标题，需传入二级标题里的a
  function isLevel2(node) {
    return $(node).parents('.nav_levtwo').length;
  }
  // 获取第一个二级标题，需传入一级标题里的a
  function getFirstLevel2(node) {
    if(!$(node).hasClass('j-flag-levone')) return;
    var nav = $(node).parent().next('ul.nav_levtwo');
    if(!nav.length) return;
    return nav.find('li:first');
  }
  // 展开二级目录，需传入一级标题的a或二级标题里的任意结构
  function showLevel2(node) {
    // 二级标题
    var nav = $(node).parents('.nav_levtwo');
    // 一级标题
    if(isLevel1(node))  nav = $(node).parent().next('ul.nav_levtwo');

    if(nav.length) {
      $('.j-nav .show .nav_levtwo').css('display', 'none').parent().removeClass('show');
      nav.css('display', 'block').parent().addClass('show');
    }
  }
  /**
   * 添加icon的hover效果
   */
  function onIconOver(event) {
    $(this).parent().addClass('over');
  }
  function onIconOut(event) {
    $(this).parent().removeClass('over');
  }
  $('.j-flag-icon').mouseover(onIconOver);
  $('.j-flag-icon').mouseout(onIconOut);
  /**
   * 点击锚点动画
   */
   function onClickLink(event) {
     // 锚点跳转
     var node = this;
     var to = $(node).attr('href');
     var nowSel = $('.j-nav .select a[href]');

     // 相同锚点不处理
     if(nowSel.attr('href') === to) return;

     // 针对有二级标题的一级标题，点击一级标题相当于点击第一个二级标题
     if(isLevel1(node)) node = getFirstLevel2(node);
     nowSel.parents('.select').removeClass('select');
     nowSel.parents('li.show').removeClass('show');
     if(isLevel2(nowSel)) {
       // 如果当前是二级标题，删除一级标题的选中展开标记
       $(nowSel).parents('.nav_levtwo').parent().removeClass('selshow');
     }

     $(node).addClass('select');
     if(isLevel2(node)) {
       // 如果当前是二级标题，追加一级标题的选中展开标记
       $(node).parents('.nav_levtwo').parent().addClass('selshow');
     }
     showLevel2(node);

     $('.j-cnt').animate({
       scrollTop: getOffset($(to).get(0), $('.j-cnt').get(0)).y
     }, 200);
   }
  $('.j-nav a[href!="#"]').click(onClickLink);
  /**
   * 点击icon动画
   */
  function onClickIcon(event) {
    var parent = $(this).parent();
    if(!$(this).prev('.nav_levtwo').length) {
      // 如果是没有二级标题的一级标题
      $(this).prev().find('a').click();
      return;
    }

    if(parent.hasClass('show')) {
      $(this).prev().slideUp(200, function() {
        parent.removeClass('show');
      });
    } else {
      $(this).prev().slideDown(200, function() {
        parent.addClass('show');
      });
    }
  }
  $('.j-flag-icon').click(onClickIcon);
  /**
   * 初始化选择锚点
   */
  var hash = location.hash;
  if(hash) {
    onClickLink.call($('.j-nav a[href="' + hash + '"]'));
  } else {
    onClickLink.call($('.j-nav li:first a[href!="#"]'));
  }
  /**
   * 监听滚动
   */
  // 获取id列表
  var ids = [];
  $('.j-nav a[href!="#"]').each(function() {
    if(isLevel1(this)) {
      // 过滤有二级标题的一级标题
      return;
    }
    ids.push($(this).attr('href'));
  });
  // 获取id和位移映射表
  var idMap = {};
  for(var i=0,len=ids.length,itm; i<len; i++) {
    itm = ids[i];
    idMap[itm] = getOffset($(itm).get(0), $('.j-cnt').get(0)).y;
  }
  // 获取当时滚动到的元素
  function getScrollNode(node) {
    var scrollTop = $(node).get(0).scrollTop;
    for(var i=0,len=ids.length; i<len; i++) {
      var itm = ids[i];
      var prevItm = ids[i-1];
      if(itm!=0 && idMap[itm] > scrollTop && idMap[prevItm] <= scrollTop) {
        // 被滚动节点还有部分内容呈现时
        return prevItm;
      } else if (i === len-1 && idMap[itm] < scrollTop) {
        // 只有最后一个节点内容呈现时
        return itm;
      }
    }
    return ids[0];
  }
  // 监听滚动事件
  $('.j-cnt').scroll(function() {
    var scrollNode = getScrollNode($(this));
    var lastSel = $('.j-nav .select').removeClass('select');
    if(isLevel2(lastSel)) {
      // 如果当前是二级标题，删除一级标题的选中展开标记
      $(lastSel).parents('.nav_levtwo').parent().removeClass('selshow');
    }
    // 在直属的li上加select
    var node = $('.j-nav a[href="' + scrollNode + '"]').parent().parent().addClass('select');
    if(isLevel2(node)) {
      // 如果当前是二级标题，添加一级标题的选中展开标记
      $(node).parents('.nav_levtwo').parent().addClass('selshow');
    }

    // 展开二级目录
    showLevel2(node);
  });
  // 添加复制按钮
  $('.j-cnt pre code').before('<div class="copy_btn" title="点击复制代码" data-clipboard-target="" data-clipboard-text="">复制</div>');
  var client = new ZeroClipboard($('.j-cnt pre .copy_btn'));
  client.on('beforecopy', function(event) {
    // 开始复制
    var target = event.target;
    $(target).next('code').addClass('copy');
  });
  client.on('copy', function(event) {
    // 复制过程
    var target = event.target;
    var text = target.nextSibling.textContent || target.nextSibling.innerText || target.nextSibling.innerHTML;
    var clipboard = event.clipboardData;
    clipboard.setData('text/plain', text);
  });
  client.on('aftercopy', function(event) {
    // 复制结束
    var target = event.target;
    $(target).next('code').removeClass('copy');
  });
  client.on('error', function(event) {
    // 异常
    $('.j-cnt pre .copy_btn').hide();
    ZeroClipboard.destroy();
  });
})(window, document, $, undefined)
