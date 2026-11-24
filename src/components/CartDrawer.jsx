import React, { useState } from 'react';
import { X, ShoppingBag, Trash2, ArrowRight, Tag, Check, Sparkles } from 'lucide-react';

export default function CartDrawer({
  isOpen,
  onClose,
  items = [],
  onRemoveItem,
  onCheckout,
  onClearCart
}) {
  const [couponCode, setCouponCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState(0);
  const [couponMessage, setCouponMessage] = useState('');

  if (!isOpen) return null;

  const rawSubtotal = items.reduce((acc, curr) => acc + curr.price, 0);
  const discountAmount = (rawSubtotal * appliedDiscount) / 100;
  const finalTotal = Math.max(0, rawSubtotal - discountAmount);

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    const code = couponCode.trim().toUpperCase();
    if (code === 'EDUKON50' || code === 'WELCOME' || code === 'EDUKON2026') {
      setAppliedDiscount(50);
      setCouponMessage('🎉 50% promo code applied!');
    } else if (code === 'STUDENT20') {
      setAppliedDiscount(20);
      setCouponMessage('🎉 20% student discount applied!');
    } else {
      setCouponMessage('Invalid coupon code. Try EDUKON50');
      setAppliedDiscount(0);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-900/60 backdrop-blur-xs flex justify-end animate-in fade-in duration-200"
      onClick={onClose}>
      <div 
        className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Drawer Header */}
        <div className="p-5 border-b border-stone-200 flex items-center justify-between bg-[#faf8f5]">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-[#f15524]" />
            <h3 className="font-extrabold text-base text-slate-900">
              Your Course Cart ({items.length})
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-slate-900 rounded-lg hover:bg-stone-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Cart Item List */}
        <div className="flex-1 overflow-y-auto p-5 divide-y divide-stone-100">
          {items.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-16 h-16 rounded-full bg-stone-100 text-stone-400 flex items-center justify-center mx-auto mb-4">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <h4 className="font-bold text-slate-800 text-base mb-1">Your cart is empty</h4>
              <p className="text-xs text-stone-500 mb-6">Explore our featured courses and start learning today!</p>
              <button
                onClick={onClose}
                className="px-6 py-2.5 bg-[#f15524] text-white text-xs font-bold rounded-full hover:bg-[#e04818]"
              >
                Explore Courses
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.id} className="py-4 flex gap-3 group">
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  className="w-20 h-16 object-cover rounded-xl shrink-0"
                />
                <div className="flex-1 min-w-0 flex flex-col justify-between">
                  <div>
                    <h5 className="font-bold text-slate-900 text-xs sm:text-sm line-clamp-1 leading-snug">
                      {item.title}
                    </h5>
                    <p className="text-[11px] text-stone-500">
                      By {item.instructor.name}
                    </p>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <span className="font-black text-slate-900 text-sm">
                      ${item.price}
                    </span>
                    <button
                      onClick={() => onRemoveItem(item.id)}
                      className="text-stone-400 hover:text-rose-500 p-1"
                      title="Remove course"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer with Totals and Coupon */}
        {items.length > 0 && (
          <div className="p-5 border-t border-stone-200 bg-[#faf8f5] space-y-4">
            
            {/* Promo Code Input */}
            <form onSubmit={handleApplyCoupon} className="space-y-1.5">
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Tag className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    placeholder="Coupon: EDUKON50"
                    className="w-full bg-white border border-stone-200 rounded-xl pl-9 pr-3 py-2 text-xs uppercase font-bold text-slate-800 placeholder-stone-400 focus:outline-none focus:border-[#f15524]"
                  />
                </div>
                <button
                  type="submit"
                  className="px-4 py-2 bg-stone-900 hover:bg-stone-800 text-white text-xs font-bold rounded-xl"
                >
                  Apply
                </button>
              </div>
              {couponMessage && (
                <p className={`text-[11px] font-bold ${appliedDiscount > 0 ? 'text-emerald-600' : 'text-rose-500'}`}>
                  {couponMessage}
                </p>
              )}
            </form>

            {/* Calculations */}
            <div className="space-y-1.5 text-xs text-stone-600 pt-2 border-t border-stone-200/80">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span className="font-bold text-slate-900">${rawSubtotal.toFixed(2)}</span>
              </div>
              {appliedDiscount > 0 && (
                <div className="flex justify-between text-emerald-600 font-bold">
                  <span>Coupon Discount ({appliedDiscount}%):</span>
                  <span>-${discountAmount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between text-base font-black text-slate-900 pt-2 border-t border-stone-200">
                <span>Total:</span>
                <span className="text-[#f15524]">${finalTotal.toFixed(2)}</span>
              </div>
            </div>

            {/* Checkout CTA */}
            <button
              onClick={() => onCheckout(items, finalTotal)}
              className="w-full py-3.5 bg-[#f15524] hover:bg-[#e04818] active:scale-98 text-white font-black text-sm rounded-xl shadow-lg shadow-orange-500/25 transition-all flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>Complete Checkout & Enroll</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
