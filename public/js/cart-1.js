/* Set rates + misc */
var taxRate = 0.1025;
var fadeTime = 300;


/* Assign actions */
$('.product-quantity-1 input').change( function() {
    updateQuantity(this);
});

$('.product-removal-1 button').click( function() {
    removeItem(this);
});


/* Recalculate cart */
function recalculateCart()
{
    var subtotal = 0;

    /* Sum up row totals */
    $('.product-1').each(function () {
        subtotal += parseFloat($(this).children('.product-line-price-1').text());
    });

    /* Calculate totals */
    var tax = subtotal * taxRate;
    var total = subtotal + tax;

    /* Update totals display */
    $('.totals-value-1').fadeOut(fadeTime, function() {
        $('#cart-subtotal-1').html(subtotal.toFixed(2));
        $('#cart-tax-1').html(tax.toFixed(2));
        $('#cart-total-1').html(total.toFixed(2));
        if(total == 0){
            $('.checkout-1').fadeOut(fadeTime);
        }else{
            $('.checkout-1').fadeIn(fadeTime);
        }
        $('.totals-value-1').fadeIn(fadeTime);
    });
}


/* Update quantity */
function updateQuantity(quantityInput)
{
    /* Calculate line price */
    var productRow = $(quantityInput).parent().parent();
    var price = parseFloat(productRow.children('.product-price-1').text());
    var quantity = $(quantityInput).val();
    var linePrice = price * quantity;

    /* Update line price display and recalc cart totals */
    productRow.children('.product-line-price-1').each(function () {
        $(this).fadeOut(fadeTime, function() {
            $(this).text(linePrice.toFixed(2));
            recalculateCart();
            $(this).fadeIn(fadeTime);
        });
    });
}


/* Remove item from cart */
function removeItem(removeButton)
{
    /* Remove row from DOM and recalc cart total */
    var productRow = $(removeButton).parent().parent();
    productRow.slideUp(fadeTime, function() {
        productRow.remove();
        recalculateCart();
    });
}
