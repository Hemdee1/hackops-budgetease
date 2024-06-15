import AuthHeader from "@/components/authHeader";

const Page = () => {
  return (
    <div className="py-24">
      <AuthHeader />

      <div className="w-[600px] mt-20 max-w-full mx-auto border-gray4 border  rounded-3xl px-5 sm:px-10 py-8">
        <h2 className="text-2xl font-bold">Forget password 🤔</h2>
        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <input
            type="email"
            className="bg-[#F5F5F5] px-4 py-5 rounded-lg w-full text-sm"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <p className="text-red text-center">{error}</p>

          <div>
            <button
              disabled={loading}
              className="w-full py-5 rounded-lg bg-primary font-bold text-center text-white mt-6"
            >
              {loading ? (
                <span className="loader-small" />
              ) : (
                "Send password reset link"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Page;
