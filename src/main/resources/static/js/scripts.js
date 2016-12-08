$(".answer-write input[type='submit']").click(addAnswer);

function addAnswer(e) {
	console.log('click answer button');
	e.preventDefault(); // submit not use..
	
	var url = $(".answer-write").attr("action");	
	console.log("url : " + url);
	
	var queryString = $(".answer-write").serialize();
	console.log("queryString : " + queryString);
	
	$.ajax({
		type: 'post',
		url: url,
		data: queryString,
		dataType: 'json',
		error: function() {
			console.log('fail');
		},
		success: function(data) {
			//console.log('json : ' + data);
			console.log(data);
			 var answerTemplate = $("#answerTemplate").html();
			 var template = answerTemplate.format(data.writer.userId, data.formattedCreateDate, data.contents, data.question.id,
			data.id);
			 $(".qna-comment-slipp-articles").prepend(template);
			 $("textarea[name=contents]").val("");			
		}
		
	});
}

$(".qna-comment-slipp-articles").on("click", ".answer-delete button[type='submit']", deleteAnswer);
// event delegation
// event loop
// this
// close
function deleteAnswer(e) {
	console.log('click delete button');
	e.preventDefault();
	
	var url = $(".answer-delete").attr("action");
	console.log("upper this : ", this);
	var $this = $(this);
	
	console.log('url : ', url);
	
	$.ajax({
		type: 'delete',
		url: url,	
		dataType: 'json',
		error: function() {
			console.log('fail');
		},
		success: function(data) {
			console.log(data);
			$this.closest(".article").remove(); // article.. 삭제 버튼 클릭 시 가장 가까운 .article을 제거..
			console.log("owner this : ", this);
		}
		
	});
}

String.prototype.format = function() {
  var args = arguments;
  return this.replace(/{(\d+)}/g, function(match, number) {
    return typeof args[number] != 'undefined'
        ? args[number]
        : match
        ;
  });
};