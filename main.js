var posts = [];
var counter = 0;

var post = function(){
	$('.posts').empty();
	posts.forEach(function(i){
		var post = '<p class="post" data-id=' + '"' + i.id + '">' + i.text + '<button class="remove">Remove</button><button class="add-comment">Add Comment</button><button class="show-comments">Show Comments</button></p>';
		$('.posts').append(post);
	});
}

var addPost = function(str){
	counter++;
	var newPost = {
		text: str,
		id: counter,
		comments: []
	};
	posts.push(newPost);
	post();
}

var addComment = function(num, str,name){
		for(i = 0; i < posts.length; i++) {
		if(posts[i].id === num){
			posts[i].comments.push({commenter: name, comment: str});
		}
	}
};

var showComments = function(num,obj){
	var d = '<div class="comment-section"></div>';
	var starD = '<div>';
	var endD = '</div>';
	var b = '<br>';
	for(i = 0; i < posts.length; i++){
		if(posts[i].id === num){
			obj.parent().append(d);
			for(j = 0; j < posts[i].comments.length; j++){
					var name = '<h2>' + posts[i].comments[j].commenter + '</h2>';
					var comment = '<p>' + posts[i].comments[j].comment + '</p>';
					var str = starD + name + b + comment + endD;
					obj.parent().children('.comment-section').append(str);
			}
		}
	}
}

var removePost = function(num){
	for(i = 0; i < posts.length; i++) {
		if(posts[i].id === num){
			posts.splice(i,1);
		}
	}
	post();
}

addPost('first');
addPost('second');
addPost('third');
addPost('fourth');

$('.posts').on('click','.remove',function(e){
	e.preventDefault();
	removePost($(this).parent().data().id);
	$(this).parent().remove();
	post();
});

$('.add-post').on('click',function(e){
	e.preventDefault();
	var text = $('#post-name').val();
	addPost(text);
	$('#post-name').val('');
});

$('.posts').on('click','.add-comment',function(e){
	e.preventDefault();
	var starD = '<div>';
	var endD = '</div>';
	var b = '<br>';
	var t1 = '<input type="text" class="name" placeholder="name"></input>'
	var t2 = '<textarea class="comment" placeholder="write your comment"></textarea>'
	var btn = '<button class=post-comment>post</button>'
	var str = starD + t1 + b + t2 + btn + endD;
	$(this).parent().append(str);
});

$('.posts').on('click','.post-comment',function(e){
	e.preventDefault();
	var num = $(this).parent().parent().data().id;
	var text = $(this).siblings('textarea').val();
	var name = $(this).siblings('.name').val();
	addComment(num,text,name);
	$(this).parent().remove();
});

$('.posts').on('click','.show-comments',function(e){
	e.preventDefault();
	var num = $(this).parent().data().id;
	showComments(num,$(this));
	$(this).text('Hide comments');
	$(this).attr('class','hide-comments');
});

$('.posts').on('click','.hide-comments',function(e){
	e.preventDefault();
	$(this).siblings('.comment-section').remove();
	$(this).text('Show comments');
	$(this).attr('class','show-comments');
});


