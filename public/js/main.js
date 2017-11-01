$(document).ready(() => {
  $('.category-delete').on('click', (e) => {
    $target = $(e.target);
    const id = $target.attr('data-cat-id');
        $.ajax({
            type: 'DELETE',
            url: '/categories/delete/'+id,
            success: (response) => {
                alert('Category Removed');
                window.location.href='/'
            },
            error: (error) => {
                 console.log(error);
            }
        });

    });
});